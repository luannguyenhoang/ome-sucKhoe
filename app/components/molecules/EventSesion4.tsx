"use client";

import { GET_EVENT_UPCOMING } from "@/app/api/Graphql/event";
import { getData } from "@/lib/getData";
import Image from "next/image";
import { useEffect, useState } from "react";
import ButtonAnimation from "../atoms/ButtonAnimation";
import LoadingOverlay from "../atoms/LoadingOverlay";
import { formatDate } from "@/utils/date";

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
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, []);

  return (
    <>
      <div className="relative text-white rounded-md overflow-hidden h-[120px]">
        {isLoading && <LoadingOverlay />}
        <div className="absolute inset-0">
          <Image
            src={eventData?.banner?.node?.mediaItemUrl || "/no-image.jpeg"}
            alt="Banner background"
            fill
            sizes="(max-width: 768px) 100vw, 100%"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-between px-8 py-4">
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-3xl italic text-white">
              {eventData?.name}
            </h2>
            <p className="text-white mt-1 font-bold">{eventData?.eventname}</p>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-white text-sm">Ngày:</span>
                <span className="text-gray-300 text-sm">
                  {formatDate(eventData?.date)}
                </span>
                <span className="text-gray-300 text-sm">
                  {eventData?.starttime} - {eventData?.endTime}
                </span>
              </div>
            </div>

          </div>

          <div>
            <ButtonAnimation
              link={eventData?.link || "/"}
              padding="px-5 py-2"
              fontWeight="font-medium"
              uppercase={true}
              text="Đăng kí tham gia"
              bg="bg-white"
              hoverBg="bg-gray-500"
              textColor="text-gray-800"
              borderColor="border-gray-200"
              rounded="rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};
