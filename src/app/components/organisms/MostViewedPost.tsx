"use client";

import { ALL_CATEGORIES } from "@/src/utils/category";
import { formatDate } from "@/src/utils/date";
import { getCategoryDisplayName } from "@/src/utils/getCategoryDisplayNameAndColor";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import xss from "xss";

export const MostViewedPost = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLatestPosts = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(`/api/posts?size=6&offset=0`, {
          next: { revalidate: 1 },
        });

        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }

        const data: { posts: any[] } = await res.json();

        if (data.posts?.length) {
          const filteredPosts = data.posts.filter((post) =>
            post.categories?.some((category: string) =>
              ALL_CATEGORIES.includes(category)
            )
          );
          setPosts(filteredPosts.slice(0, 2));
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching latest posts:", error);
        setPosts([]);
      }

      setIsLoading(false);
    };

    getLatestPosts();
  }, []);

  if (posts.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="w-full my-8">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-black mr-2 uppercase">
          được xem nhiều nhất
        </h2>
        <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
        <div className="flex-1 gap-2">
          <div className="flex-1 h-[1px] mb-1 bg-gray-200"></div>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>
      </div>

      <div className="border border-1 rounded-lg border-gray-200 relative">
        {isLoading ? (
          <>
            <div className="relative text-white rounded overflow-hidden h-[260px] bg-gray-200 animate-pulse"></div>
            <div className="text-white w-[80%] mx-auto mt-[-30px] rounded-lg h-auto bg-white z-30 relative pb-5 p-2">
              <div className="p-3 border-b">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-5 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
                  <div className="w-20 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="p-3">
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-5 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
                  <div className="w-20 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="relative text-white rounded overflow-hidden h-[260px] z-0">
              <div>
                <Image
                  src={
                    posts[0]?.featured_image ||
                    posts[0]?.image ||
                    "/no-image.jpeg"
                  }
                  alt={posts[0]?.title || "Banner background"}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover z-0"
                />
              </div>
            </div>
            <div className="text-white w-[80%] mx-auto mt-[-30px] rounded-lg h-auto bg-white z-30 relative pb-5 p-2">
              <Link href={`${posts[0]?.slug}`} className="block group">
                <div className="p-3 border-b">
                  <div className="text-gray-600 text-xs uppercase mb-1">
                    {getCategoryDisplayName(posts[0]?.categories[0]) ||
                      "TECHNOLOGY"}
                  </div>
                  <h3 className="font-bold text-base text-black mb-1 leading-tight">
                    <span className="relative">
                      <span className="relative inline bg-[linear-gradient(transparent_calc(100%_-_2px),#000000FF_calc(100%_-_2px))] bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-all duration-1000">
                        {xss(posts[0]?.title) ||
                          "Có nên học văn bằng 2 ngôn ngữ Anh không? Học ở đâu là tốt nhất?"}
                      </span>
                    </span>
                  </h3>
                  <div className="text-gray-600 text-xs flex items-center">
                    <span className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 inline"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    {formatDate(posts[0]?.date)}
                  </div>
                </div>
              </Link>
              <Link href={`/${posts[1]?.slug}`} className="block group">
                <div className="p-3">
                  <div className="text-gray-600 text-xs uppercase mb-1">
                    {getCategoryDisplayName(posts[1]?.categories[0]) ||
                      "TECHNOLOGY"}
                  </div>
                  <h3 className="font-bold text-base text-black mb-1 leading-tight">
                    <span className="relative">
                      <span className="relative inline bg-[linear-gradient(transparent_calc(100%_-_2px),#000000FF_calc(100%_-_2px))] bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-all duration-1000">
                        {xss(posts[1]?.title) ||
                          "Có nên học văn bằng 2 ngôn ngữ Anh không? Học ở đâu là tốt nhất?"}
                      </span>
                    </span>
                  </h3>
                  <div className="text-gray-600 text-xs flex items-center">
                    <span className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 inline"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    {formatDate(posts[1]?.date)}
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
