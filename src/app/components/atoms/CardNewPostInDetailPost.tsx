import { formatDate } from "@/src/utils/date";
import { getCategoryDisplayName } from "@/src/utils/getCategoryDisplayNameAndColor";
import Image from "next/image";
import Link from "next/link";

export default function CardNewPostInDetailPost({
  post,
  categoryCounts,
  textColor = "text-black",
}: {
  post: any;
  categoryCounts?: any;
  textColor?: string;
}) {
  return (
  
    
    <Link
      href={`${post.slug}`}
      className="flex items-center gap-4 cursor-pointer  relative py-4 group"
    >
      <div className="relative">
        {categoryCounts && (
          <div className="absolute right-0 top-2 border-2 border-white w-6 h-6 bg-gray-700 group-hover:bg-blue-600 rounded-full flex items-center justify-center z-10 transition-colors duration-300">
            <span className="text-white text-xs font-bold">
              {categoryCounts[post?.categories[0]] || 0}
            </span>
          </div>
        )}
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          <Image
            src={post.featured_image || "/no-image.jpeg"}
            alt={post.title || "No image"}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-400 text-xs font-semibold">
          {getCategoryDisplayName(post?.categories[0]) || "Tin tức"}
        </span>
        <div className="relative overflow-hidden group/title">
          <h3 className={`font-semibold text-base ${textColor} line-clamp-2`}>
            <span className="relative inline bg-[linear-gradient(transparent_calc(100%_-_2px),#000000FF_calc(100%_-_2px))] bg-no-repeat bg-[length:0%_100%] group-hover/title:bg-[length:100%_100%] transition-all duration-1000">
              {post.title || "No title"}
            </span>
          </h3>
        </div>
        <span className="text-gray-400 text-xs">
          {formatDate(post.date || "2025-05-09")}
        </span>
      </div>
    </Link>
  );
}
