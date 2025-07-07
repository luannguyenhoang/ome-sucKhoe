"use client";

import { formatDate } from "@/src/utils/date";
import { getCategoryColor } from "@/src/utils/getCategoryDisplayNameAndColor";
import { toSlug } from "@/src/utils/toSlug";
import Image from "next/image";
import Link from "next/link";
import xss from "xss";
import ButtonAnimation from "./ButtonAnimation";

export const CardBlogVert = ({
  title,
  desc,
  tag,
  image,
  path,
  date
}: {
  title: string;
  desc: string;
  tag: string;
  image?: string;
  path?: string;
  date?: string;
}) => {
  const coverTag = toSlug(tag);
  return (
    <div className="relative flex flex-col overflow-hidden variant-outline rounded-md bg-white transition-all duration-300 group mb-8">
      <div className="w-full">
        <div className="rounded-md overflow-hidden mb-3">
          <div className="overflow-hidden">
            <Link href={`/${path}`}>
              <Image
                placeholder="blur"
                blurDataURL={image || `/suc-khoe/no-image.jpeg`}
                loading="lazy"
                width={720}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                height={200}
                src={image || `/suc-khoe/no-image.jpeg`}
                alt={title}
                className="transition-transform duration-500 group-hover:scale-105"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "16/9",
                  objectFit: "cover"
                }}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className=" pb-4 flex flex-col gap-3">
        <div
          className={`text-xs font-bold text-white  w-fit top-2 right-2 z-10 ${getCategoryColor(
            coverTag
          )} rounded-sm px-2 py-1`}
          dangerouslySetInnerHTML={{ __html: tag }}
        />

        <div className="relative overflow-hidden group/title w-fit">
          <h3 className="text-2xl text-black font-bold w-fit">
            <Link
              href={`/${path}`}
              className="relative inline bg-[linear-gradient(transparent_calc(100%_-_2px),#000000FF_calc(100%_-_2px))] bg-no-repeat bg-[length:0%_100%] group-hover/title:bg-[length:100%_100%] transition-all duration-1000"
              dangerouslySetInnerHTML={{ __html: xss(title) }}
            />
          </h3>
        </div>
        <div className="flex w-fit gap-3">
          <p className="text-sm text-gray-500 font-bold">BY ADMIN</p>
          <p className="text-sm text-gray-500">{formatDate(date || "")}</p>
        </div>

        <div
          className="text-gray-500 text-sm"
          dangerouslySetInnerHTML={{ __html: desc }}
        />

        <ButtonAnimation text="Xem thêm" link={`/${path}`} />
      </div>
    </div>
  );
};
