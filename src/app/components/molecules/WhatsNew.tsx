"use client";

import { formatDate } from "@/src/utils/date";
import { getCategoryDisplayName } from "@/src/utils/getCategoryDisplayNameAndColor";
import { ALL_CATEGORIES } from "@/src/utils/category";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import xss from "xss";
import CardNewPost from "../atoms/CardNewPost";

export const WhatsNew = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLatestPosts = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(`/suc-khoe/api/posts?size=10&offset=0`, {
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

          setPosts(filteredPosts.slice(0, 5));
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
    return (
      <div className="py-10">
        <div className="max-w-[900px] mx-auto text-center">
          <p>Không có bài viết mới nào.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:py-16 lg:px-10 p-3 bg-[#faf7f4] rounded-md">
      <div className="max-w-[900px] mx-auto">
        <div className="flex items-center mb-6">
          <h2 className="text-3xl font-bold text-black mr-2">Có gì mới</h2>
          <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
          <div className="flex-1 gap-2">
            <div className="flex-1 h-[1px] mb-1 bg-gray-200"></div>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>
        </div>

        <div className="relative">
          {isLoading ? (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-3/5">
                <div className="relative rounded-md overflow-hidden aspect-[9/9] bg-gray-200 animate-pulse">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="mb-2">
                      <div className="w-28 h-[26px] bg-gray-300 rounded-sm"></div>
                    </div>
                    <div className="h-7 bg-gray-300 rounded w-3/4 mb-1"></div>
                    <div className="h-7 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3 mt-2"></div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/5 flex flex-col justify-between">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-md lg:pt-0 pt-4"
                  >
                    <div className="block w-[120px] h-[90px] relative rounded overflow-hidden flex-shrink-0 bg-gray-200 animate-pulse"></div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <div className="mb-1">
                        <div className="w-40 h-[18px] bg-gray-300 rounded-sm"></div>
                      </div>
                      <div className="h-5 bg-gray-300 rounded w-3/4 mb-1"></div>
                      <div className="h-5 bg-gray-300 rounded w-1/2 mb-1"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/3 mt-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-3/5">
                <Link href={`/${posts[0]?.slug}`} className="block group">
                  <div className="relative rounded-md overflow-hidden aspect-[9/9]">
                    <Image
                      src={posts[0]?.featured_image}
                      alt={posts[0]?.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 540px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                      <div className="mb-2">
                        <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-sm">
                          {getCategoryDisplayName(posts[0]?.categories[0])}
                        </span>
                      </div>
                      <div className="relative overflow-hidden group/title">
                        <h3 className="text-xl font-bold text-white leading-tight">
                          <span className="relative inline bg-[linear-gradient(transparent_calc(100%_-_2px),#FFFFFFFF_calc(100%_-_2px))] bg-no-repeat bg-[length:0%_100%] group-hover/title:bg-[length:100%_100%] transition-all duration-1000">
                            {xss(posts[0]?.title)}
                          </span>
                        </h3>
                      </div>
                      <div className="text-xs text-white/70 mt-2">
                        {formatDate(posts[0]?.date)}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="md:w-2/5 flex flex-col justify-between">
                {posts.slice(1).map((post, index) => (
                  <CardNewPost post={post} key={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
