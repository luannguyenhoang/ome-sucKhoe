"use client";

import { GET_EVENT } from "@/src/app/api/Graphql/event";
import { getData } from "@/src/lib/getData";
import { formatDate } from "@/src/utils/date";
import Image from "next/image";
import { useEffect, useState } from "react";
import ButtonAnimation from "../atoms/ButtonAnimation";

export const Event = () => {
  const [eventData, setEventData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getData(GET_EVENT);

        if (!response) {
          throw new Error("No data received from API");
        }

        const event = response.pageBy.event.content;
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
      <div className="flex items-center mb-7">
        <h2 className="text-2xl font-bold text-black mr-2 uppercase">
          SỰ KIỆN
        </h2>
        <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
        <div className="flex-1 gap-2">
          <div className="flex-1 h-[1px] mb-1 bg-gray-200"></div>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>
      </div>
      <div className="relative text-white rounded overflow-hidden h-[350px]">
        {isLoading ? (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/90 to-purple-800/90 animate-pulse">
            <div className="flex flex-col items-center justify-between h-full p-6">
              <div className="flex flex-col items-center text-center pt-4">
                <div className="flex items-center mb-1">
                  <div className="w-[54px] h-[54px] bg-white/30 rounded-full mr-2"></div>
                  <div className="h-8 w-32 bg-white/30 rounded"></div>
                </div>
                <div className="h-6 w-60 bg-white/30 rounded mt-3 mb-1"></div>
                <div className="flex gap-4 mt-2">
                  <div className="h-5 w-24 bg-white/30 rounded"></div>
                  <div className="h-5 w-24 bg-white/30 rounded"></div>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="h-14 w-48 bg-white/30 rounded-md"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="absolute inset-0">
              <Image
                src={eventData?.banner?.node?.mediaItemUrl || "/no-image.jpeg"}
                alt="Banner background"
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/90 to-purple-800/90 flex flex-col justify-between p-6">
              <div className="flex flex-col items-center text-center pt-4">
                <div className="flex items-center mb-1">
                  <Image
                    src={eventData?.logo?.node?.mediaItemUrl || "/logo.png"}
                    alt="Logo"
                    width={54}
                    height={54}
                    className="text-blue-400 font-bold text-3xl mr-2"
                  />
                  <span className="text-white font-bold text-2xl">
                    {eventData?.name || "OM'E"}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-1">
                  {eventData?.eventname || "Tin tức OM'E"}
                </h3>
                <p className=" flex gap-4">
                  <span>{formatDate(eventData?.date) || "16/05/2025"}</span>
                  <span className="text-gray-200 font-bold">
                    {eventData?.starttime || "10:00"} -{" "}
                    {eventData?.endTime || "12:00"}
                  </span>
                </p>
              </div>

              <div className="flex justify-center">
                <ButtonAnimation
                  link={eventData?.link || "/"}
                  padding="px-5 py-4"
                  fontWeight="font-bold"
                  uppercase={true}
                  text="Đăng kí tham gia"
                  bg="bg-blue-600"
                  hoverBg="bg-blue-700"
                  textColor="text-white"
                  borderColor="border-blue-600"
                  rounded="rounded-md"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
