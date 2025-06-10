"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-7xl h-screen">
      <div className="flex flex-col items-center justify-center space-y-6 h-full">
        <h1 className="text-6xl font-bold text-blue-500">
          404
        </h1>
        <h2 className="text-3xl font-bold">Trang không tồn tại</h2>
        <p className="text-lg text-gray-600 text-center">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-full text-lg transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
