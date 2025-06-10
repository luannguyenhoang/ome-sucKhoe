"use client";
import { DefaultNewPosts } from "@/src/data/DefaultPosts";
import { formatDate } from "@/src/utils/date";
import { getCategoryColor } from "@/src/utils/getCategoryDisplayNameAndColor";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import xss from "xss";
import ButtonAnimation from "../atoms/ButtonAnimation";
import LoadingOverlay from "../atoms/LoadingOverlay";
import AnimateOnScroll from "../atoms/AnimateOnScroll";

type CategoryPostsProps = {
  categorySlug: string;
  categoryDisplayName: string;
  marginTop?: string;
};

export const LayoutNewPosts = ({
  categorySlug,
  categoryDisplayName,
  marginTop = "",
}: CategoryPostsProps) => {
  const [posts, setPosts] = useState<any[]>(DefaultNewPosts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategoryPosts = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          `/api/posts?size=3&offset=0&category=${categorySlug}`,
          {
            next: { revalidate: 1 },
          }
        );

        if (!res.ok) {
          throw new Error(`Posts fetch failed with status: ${res.statusText}`);
        }

        const data: { posts: any[] } = await res.json();

        if (data.posts?.length) {
          setPosts(data.posts);
        } else {
          setPosts(DefaultNewPosts);
        }
      } catch (error) {
        console.error(`Error fetching ${categoryDisplayName} posts:`, error);
        setPosts(DefaultNewPosts);
      }

      setIsLoading(false);
    };

    getCategoryPosts();
  }, [categorySlug, categoryDisplayName]);

  if (posts.length === 0 && !isLoading) {
    return (
      <div className="py-10">
        <div className="max-w-screen-xl mx-auto text-center">
          <p>Không có bài viết về {categoryDisplayName.toLowerCase()}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-screen-xl mx-auto ${marginTop}`}>
      <div className="flex items-center mb-8">
        <h2 className="text-2xl font-bold text-black mr-2">
          {categoryDisplayName}
        </h2>
        <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
        <div className="flex-1 gap-2">
          <div className="flex-1 h-[1px] mb-1 bg-gray-200"></div>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>
      </div>

      <div className="relative">
        {isLoading && <LoadingOverlay />}

        <div className="space-y-8">
          {posts.map((post, index) => (
            <AnimateOnScroll key={post.id || index}>
              <div
                key={post.id || index}
                className={`${
                  index !== posts.length - 1 ? "border-b border-gray-200" : ""
                } pb-8`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-2/5 lg:w-2/5">
                    <div className="relative h-60 rounded overflow-hidden">
                      <Image
                        src={post.featured_image || "/no-image.jpeg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-3/5 lg:w-3/5">
                    <div>
                      <span
                        className={`inline-block px-3 py-1 text-xs text-white uppercase font-medium ${getCategoryColor(categorySlug)} rounded-sm mb-3`}
                      >
                        {categoryDisplayName}
                      </span>
                      <h3 className="text-xl font-bold mb-3">
                        <div className="relative overflow-hidden group">
                          <Link href={`${post.slug}`}>
                            <span className="relative inline bg-[linear-gradient(transparent_calc(100%_-_2px),#000000_calc(100%_-_2px))] bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-all duration-1000">
                              {xss(post.title)}
                            </span>
                          </Link>
                        </div>
                      </h3>
                      <p
                        className="text-gray-500 text-md mb-4 line-clamp-2 overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: xss(post?.excerpt) }}
                      />
                      <div className="flex items-center text-xs text-gray-500 mb-4">
                        <span className="mr-1">By</span>
                        <span className="font-medium mr-2">
                          {post.author?.name || "ADMIN"}
                        </span>
                        <span className="mr-2">•</span>
                        <span>{formatDate(post.date)}</span>
                      </div>

                      <ButtonAnimation text="Xem thêm" link={`${post.slug}`} />
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};
