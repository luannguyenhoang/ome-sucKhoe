"use client";
import { formatDate } from "@/utils/date";
import {
  getCategoryColor,
  getCategoryDisplayName,
} from "@/utils/getCategoryDisplayNameAndColor";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

export default function CardPostCategory({
  post,
  w = "180px",
  h = "180px",
  title,
  image,
  path,
  category,
  date,
}: {
  title?: string;
  desc?: string;
  tag?: string;
  image?: string;
  path?: string;
  post?: any;
  w?: string;
  h?: string;
  category?: string;
  date?: string;
}) {
  const postTitle = title || post?.title || "";
  const postImage = image || post?.image || "/logo.png";
  const postPath = path || "#";
  const postCategory = category || post?.category || "";
  const postDate = date || post?.date || "";

  return (
    <AnimateOnScroll>
      <Link
        className="relative bg-white flex space-x-4 items-center group cursor-pointer transition-all duration-300 rounded-md "
        href={postPath}
      >
        <div
          className="relative flex-shrink-0 overflow-hidden rounded-md"
          style={{ width: w, height: h }}
        >
          <Image
            loading="lazy"
            placeholder="blur"
            blurDataURL={postImage || `/logo.png`}
            src={postImage}
            alt={postTitle}
            fill
            sizes="(max-width: 640px) 180px, 180px"
            className="rounded-md object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col justify-start">
          <span
            className={`inline-block ${getCategoryColor(
              postCategory
            )} text-[15px] font-semibold px-2 py-1 mb-4 rounded-sm w-fit text-white`}
          >
            {getCategoryDisplayName(postCategory)}
          </span>
          <div className="relative overflow-hidden group/title">
            <h3 className="font-bold text-base text-black">
              <span className="relative inline bg-[linear-gradient(transparent_calc(100%_-_2px),#000000FF_calc(100%_-_2px))] bg-no-repeat bg-[length:0%_100%] group-hover/title:bg-[length:100%_100%] transition-all duration-1000">
                {postTitle}
              </span>
            </h3>
          </div>
          <div className="flex items-center space-x-2 mt-2 text-xs font-semibold text-gray-400">
            <span>{formatDate(postDate)}</span>
          </div>
        </div>
      </Link>
    </AnimateOnScroll>
  );
}
