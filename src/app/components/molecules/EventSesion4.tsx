"use client";

import { GET_EVENT_UPCOMING } from "@/src/app/api/Graphql/event";
import ButtonAnimation from "@/src/app/components/atoms/ButtonAnimation";
import LoadingOverlay from "@/src/app/components/atoms/LoadingOverlay";
import { getData } from "@/src/lib/getData";
import { formatDate } from "@/src/utils/date";
import Image from "next/image";
import { useEffect, useState } from "react";

export const EventSesion4 = () => {
  const [eventData, setEventData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getData(GET_EVENT_UPCOMING);

        if (!response) {
          throw new Error("No data received from API");
        }

        const event = response.pageBy.event.content2;
        if (!event) {
          throw new Error("No event data found in response");
        }
        setEventData(event);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch event data"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, []);

  return (
    <>
      <div className="relative text-white rounded-md overflow-hidden h-auto min-h-[150px] md:h-[120px]">
        {isLoading && <LoadingOverlay />}
        <div className="absolute inset-0">
          <Image
            src={
              eventData?.banner?.node?.mediaItemUrl || "/suc-khoe/no-image.jpeg"
            }
            alt="Banner background"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-4 md:px-8 md:py-4">
          <div className="flex flex-col justify-center w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
            <h2 className="font-serif text-xl md:text-3xl italic text-white">
              {eventData?.name}
            </h2>
            <p className="text-white mt-1 font-bold text-sm md:text-base">
              {eventData?.eventname}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-1 md:gap-2 mt-1">
              <div className="flex items-center gap-1">
                <span className="text-white text-xs md:text-sm">Ngày:</span>
                <span className="text-gray-300 text-xs md:text-sm">
                  {formatDate(eventData?.date)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-300 text-xs md:text-sm">
                  {eventData?.starttime} - {eventData?.endTime}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-center">
            <ButtonAnimation
              link={eventData?.link || "/"}
              padding="px-6 py-2"
              fontWeight="font-medium"
              uppercase={true}
              text="Đăng kí tham gia"
              bg="bg-white"
              hoverBg="bg-gray-500"
              textColor="text-gray-800"
              borderColor="border-gray-200"
              rounded="rounded-md"
              margin="mt-0"
            />
          </div>
        </div>
      </div>
    </>
  );
};
