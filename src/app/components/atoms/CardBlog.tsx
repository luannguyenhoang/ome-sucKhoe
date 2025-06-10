"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import xss from "xss";

export const CardBlog = ({
  image,
  title,
  desc,
  path,
  tag,
}: {
  image?: string;
  title: string;
  desc: string;
  path: string;
  tag?: string;
  bgTag?: string;
  date?: string;
  imageH?: string;
  preview?: boolean;
}) => {
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const truncateHTML = (html: string, maxLength: number = 170) => {
    const text = html.replace(/<\/?[^>]+(>|$)/g, "");

    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Link
      className="relative flex flex-col overflow-hidden variant-outline rounded-sm bg-gray-100 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-[1.03] h-[420px]"
      href={path ?? "#"}
    >
      <div className="w-full h-[200px]">
        <div className="rounded-t-lg overflow-hidden h-full">
          <Image
            width={720}
            height={200}
            src={image || `/blog.jpeg`}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col flex-1">
        <div
          className="text-xs font-bold text-white absolute top-2 right-2 z-10 bg-red-500 rounded-md px-2 py-1"
          dangerouslySetInnerHTML={{ __html: tag || "" }}
        />
        <div
          className="text-2xl font-bold line-clamp-2 mb-2"
          dangerouslySetInnerHTML={{ __html: xss(title) }}
        />

        {isMounted && (
          <div className="text-gray-500 text-sm line-clamp-5 flex-1">
            {truncateHTML(desc, 150)}
          </div>
        )}
      </div>
    </Link>
  );
};
