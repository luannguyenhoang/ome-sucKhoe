"use client";

import { formatDate } from "@/utils/date";
import { getCategoryDisplayName } from "@/utils/getCategoryDisplayNameAndColor";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import xss from "xss";
import CardNewPost from "../atoms/CardNewPost";
import LoadingOverlay from "../atoms/LoadingOverlay";

export const WhatsNew = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLatestPosts = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(`/api/posts?size=5&offset=0`, {
          next: { revalidate: 1 },
        });

        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }

        const data: { posts: any[] } = await res.json();

        if (data.posts?.length) {
          setPosts(data.posts);
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
          {isLoading && <LoadingOverlay />}

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-3/5">
              <Link href={`/${posts[0]?.slug}`} className="block group">
                <div className="relative rounded-md overflow-hidden aspect-[9/9]">
                  <Image
                    src={posts[0]?.featured_image || "/no-image.jpeg"}
                    alt={posts[0]?.title || "Featured post"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 540px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="mb-2">
                      <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-sm">
                        {getCategoryDisplayName(posts[0]?.categories[0]) ||
                          "Tin tức"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {xss(posts[0]?.title) || "Post Title"}
                    </h3>
                    <div className="text-xs text-white/70 mt-2">
                      {formatDate(posts[0]?.date || "Date")}
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
        </div>
      </div>
    </div>
  );
};
