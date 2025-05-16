"use client";

import { GET_LIEN_HE } from "@/app/api/Graphql/lienHe";
import { defaultLienHeData } from "@/data/DefaultLienHeData";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";
import LoadingOverlay from "../atoms/LoadingOverlay";
import Form from "./Form";

export const Contact = () => {
  const [contactData, setContactData] = useState<any>(
    defaultLienHeData.content
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getData(GET_LIEN_HE);

        if (!response) {
          throw new Error("No data received from API");
        }

        const lienHe = response.pageBy?.lienHe;
        if (!lienHe || !lienHe.content) {
          throw new Error("No contact data found in response");
        }
        setContactData(lienHe.content);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch contact data"
        );
        setContactData(defaultLienHeData.content);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContactData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 relative">
      {isLoading && <LoadingOverlay />}
      {contactData && (
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 my-auto">
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mb-5" />
              <h3 className="text-base font-medium mb-4 text-gray-500">
                {contactData.help}
              </h3>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-6">
                {contactData.information}
              </h2>
              <p className="text-gray-500 mb-4 text-xl">
                {contactData.description}
              </p>
              <div className="grid lg:grid-cols-2  grid-cols-1 gap-6">
                <div className="flex items-center gap-3">
                  <div className="min-w-[40px] w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-500 font-spartan">
                    {contactData.location}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="min-w-[40px] w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <a
                    href={contactData.linkEmail}
                    className="text-gray-500 font-spartan hover:text-blue-600"
                  >
                    {contactData.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="min-w-[40px] w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-500 font-spartan">
                    {contactData.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="min-w-[40px] w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                      />
                    </svg>
                  </div>
                  <a
                    href={contactData.linkWeb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 font-spartan hover:text-blue-600"
                  >
                    {contactData.trangWeb}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-12 bg-[#fbfbfb] rounded-md border border-[#f0f0f0]">
            <h2 className="text-2xl font-bold mb-6 font-spartan">
              Để Lại Tin Nhắn
            </h2>
            <Form />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
