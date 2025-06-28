"use client";

import { GET_LIEN_LAC } from "@/src/app/api/Graphql/lienLac";
import { defaultLienLacData } from "@/src/data/DefaultLienLacData";
import { getData } from "@/src/lib/getData";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingOverlay from "../atoms/LoadingOverlay";

export const SocialMediaContact = () => {
  const [contactData, setContactData] = useState<any>(defaultLienLacData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getData(GET_LIEN_LAC);
        if (!response) {
          throw new Error("No data received from API");
        }

        const lienLac = response.pageBy.lienLac;
        if (!lienLac) {
          throw new Error("No contact data found in response");
        }
        setContactData(lienLac);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch contact data"
        );
        setContactData(defaultLienLacData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const getSocialIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "facebook":
        return <i className="fab fa-facebook-f"></i>;
      case "x":
        return (
          <Image
            src="/suc-khoe/x.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        );
      case "shopee":
        return (
          <Image
            src="/suc-khoe/shopee.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        );
      case "youtube":
        return <i className="fab fa-youtube"></i>;
      default:
        return <i className="fas fa-link"></i>;
    }
  };

  const getBackgroundColor = (title: string) => {
    switch (title.toLowerCase()) {
      case "facebook":
        return "bg-blue-800";
      case "x":
        return "bg-black";
      case "shopee":
        return "bg-orange-600";
      case "youtube":
        return "bg-red-600";
      default:
        return "bg-gray-700";
    }
  };

  return (
    <div className="w-full my-8">
      <div className="flex items-center mb-8">
        <h2 className="text-2xl font-bold text-black mr-2 uppercase">
          {contactData?.title || "LIÊN LẠC"}
        </h2>
        <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
        <div className="flex-1 gap-2">
          <div className="flex-1 h-[1px] mb-1 bg-gray-200"></div>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>
      </div>
      <div className="flex flex-col space-y-2 relative">
        
        {contactData?.content?.map((item: any, index: number) => (
          <Link
            key={index}
            href={item.url}
            target="_blank"
            className="block transition-transform hover:scale-105"
          >
            <div
              className={`flex items-center ${getBackgroundColor(
                item.title
              )} text-white px-2 py-3 rounded`}
            >
              <div className="bg-gray-100/20 h-9 w-9 flex items-center rounded-full justify-center">
                {getSocialIcon(item.title)}
              </div>
              <div className="pl-2 flex-grow">{item.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
