"use client";

import Image from "next/image";

export default function DangkyTc() {
  return (
    <div className="bg-gradient-to-b from-white to-[#faf4a3] -mb-20 h-[700px] flex items-center justify-center">
      <div className="text-center py-16 px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700 pb-6">
          Đăng ký thành công!
        </h1>

        <Image
          priority
          src="/suc-khoe/success-icon.png"
          width={100}
          height={100}
          alt="Thành công"
          className="mx-auto"
        />

        <p className="font-semibold text-green-700 pt-4 mb-6">
          Chúng tôi sẽ liên hệ lại với bạn!
        </p>
      </div>
    </div>
  );
}
