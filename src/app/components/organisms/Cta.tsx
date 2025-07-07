"use client";

import { useEffect, useState } from "react";
import { BiPhone } from "react-icons/bi";
import { BsMessenger } from "react-icons/bs";
import { SiZalo } from "react-icons/si";
import { GET_CTA } from "@/src/app/api/Graphql/cta";
import { getData } from "@/src/lib/getData";
import { FormWrapper } from "../molecules/FormWrapper";

export default function Cta() {
  const [showPopup, setShowPopup] = useState(false);
  const [ctaData, setCtaData] = useState({
    hotline: "",
    messenger: "",
    zalo: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCtaData = async () => {
      try {
        const response = await getData(GET_CTA);
        if (response?.allCta?.nodes?.[0]?.ctaMain?.cta) {
          setCtaData(response.allCta.nodes[0].ctaMain.cta);
        }
      } catch (error) {
        console.error("Error fetching CTA data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCtaData();
  }, []);

  return (
    <div>
      <div className="fixed top-1/2 right-0 flex flex-col items-end z-10">
        <div className="relative z-10">
          <button
            className="flex z-10 items-center justify-center bg-orange-500 text-white border-none rounded-l-md cursor-pointer w-[50px] h-[140px] absolute right-0 top-[-50px]"
            onClick={() => setShowPopup(true)}
            aria-label="Mở form tư vấn"
          >
            <span className="font-medium [writing-mode:vertical-rl] rotate-180 text-center">
              Tư vấn ngay
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-1 mt-24">
          <a
            target="_blank"
            href={ctaData.messenger}
            className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-l-full"
            aria-label="Nhắn tin qua Messenger"
          >
            <BsMessenger size={20} />
          </a>
          <a
            target="_blank"
            href={ctaData.zalo}
            className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-l-full"
            aria-label="Liên hệ qua Zalo"
          >
            <SiZalo size={20} />
          </a>
          <a
            target="_blank"
            href={ctaData.hotline}
            className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-l-full"
            aria-label="Gọi hotline"
          >
            <BiPhone size={24} />
          </a>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
          <div className="bg-white p-5 rounded-lg w-[400px] relative">
            <button
              className="absolute top-2.5 right-2.5 bg-transparent border-none text-xl cursor-pointer"
              onClick={() => setShowPopup(false)}
              aria-label="Đóng form tư vấn"
            >
              ×
            </button>
            <h3 className="text-center mb-5">Để lại thông tin</h3>
            <FormWrapper />
          </div>
        </div>
      )}
    </div>
  );
}
