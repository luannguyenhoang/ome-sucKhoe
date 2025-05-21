"use client";

import { clean } from "@/lib/sanitizeHtml";
import { formatDate } from "@/utils/date";
import Image from "next/image";

export const BanerPost = ({ post }: { post: any }) => {
  return (
    <div className="relative w-full">
      <div className="relative w-full h-[500px] lg:h-[610px]">
        <Image
          src={post?.featuredImage || "/no-image.jpeg"}
          alt={post?.title || ""}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center w-full p-8">
        <div className="max-w-7xl w-full flex flex-col gap-4">
          <div>
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-2"
              dangerouslySetInnerHTML={{
                __html: clean(post?.title),
              }}
            />
          </div>
          <div className="text-sm font-medium text-gray-300 flex gap-4">
            <span>BY ADMIN</span>
            <span>{formatDate(post?.date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
