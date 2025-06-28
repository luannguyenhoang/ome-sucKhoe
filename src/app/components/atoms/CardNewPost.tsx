"use client";
import { formatDate } from "@/src/utils/date";
import { getCategoryDisplayName } from "@/src/utils/getCategoryDisplayNameAndColor";
import Image from "next/image";
import Link from "next/link";
import xss from "xss";
import AnimateOnScroll from "./AnimateOnScroll";

export default function CardNewPost({ post }: { post: any }) {
  return (
    <AnimateOnScroll>
      <div className="flex gap-4 rounded-md transition-all duration-300 group lg:pt-0 pt-4">
        <Link
          href={`/${post.slug}`}
          className="block w-[120px] h-[full] relative rounded overflow-hidden flex-shrink-0"
        >
          <Image
            src={post.featured_image || "/suc-khoe/blog.jpeg"}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 120px, 120px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <div className="font-medium mb-1">
            <span className="text-gray-600">
              {getCategoryDisplayName(post?.categories[0]) || "Tin tức"}
            </span>
          </div>
          <Link href={`${post.slug}`} className="block group/title">
            <div className="relative overflow-hidden">
              <h3 className="text-black font-bold text-base line-clamp-2">
                <span className="relative inline bg-[linear-gradient(transparent_calc(100%_-_2px),#000000FF_calc(100%_-_2px))] bg-no-repeat bg-[length:0%_100%] group-hover/title:bg-[length:100%_100%] transition-all duration-1000">
                  {xss(post.title)}
                </span>
              </h3>
            </div>
          </Link>
          <div className="text-xs text-gray-700 mt-1">
            {formatDate(post?.date)}
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
