import { SlideProps } from "@/src/types/SlideProps";
import { formatDate } from "@/src/utils/date";
import {
  getCategoryColor,
  getCategoryDisplayName,
} from "@/src/utils/getCategoryDisplayNameAndColor";
import Image from "next/image";
import Link from "next/link";
import xss from "xss";
import ButtonAnimation from "../atoms/ButtonAnimation";

export default function Slide({ post }: SlideProps) {
  const displayCategory =
    post.category || (post.categories && post.categories[0]) || "";

  return (
    <div className="relative w-full h-[720px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={post.featured_image || "/suc-khoe/no-image.jpeg"}
          alt={post.title || "banner"}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
      </div>

      <div className="absolute w-full px-14 lg:px-0 justify-center z-20 text-white flex items-center h-full select-none">
        <div className="max-w-7xl w-full">
          <div className="mb-3">
            <span
              className={`inline-block ${getCategoryColor(
                displayCategory
              )} text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider`}
            >
              {getCategoryDisplayName(displayCategory)}
            </span>
          </div>

          <div className="relative overflow-hidden">
            <h3 className="lg:text-5xl text-xl font-bold mb-4 lg:w-[45%] w-[80%] leading-relaxed lg:leading-tight">
              <Link href={`${post.slug}`} className="inline group/title">
                <span className="relative inline bg-[linear-gradient(transparent_calc(100%_-_2px),#FFFFFFFF_calc(100%_-_2px))] bg-no-repeat bg-[length:0%_100%] group-hover/title:bg-[length:100%_100%] transition-all duration-1000">
                  {xss(post.title)}
                </span>
              </Link>
            </h3>
          </div>

          <div className="flex items-center text-sm space-x-5">
            {post.author && (
              <div className="flex items-center">
                <span className="mr-2">BY</span>
                <span className="font-semibold uppercase">{post.author}</span>
              </div>
            )}

            <div className="flex items-center">
              <span>{formatDate(post.date)}</span>
            </div>

            {post.views && (
              <div className="flex items-center">
                <span>{post.views} VIEWS</span>
              </div>
            )}
          </div>
          <ButtonAnimation
            margin="mt-6"
            link={`${post.slug}`}
            padding="px-6 py-4"
            fontWeight="font-bold"
            uppercase={true}
            text="Đọc thêm"
            bg="bg-[#2962ff]"
            hoverBg="bg-blue-700"
            textColor="text-white"
            borderColor="border-blue-700"
            rounded="rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
