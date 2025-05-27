"use client";
import { defaultTopCategoryPosts } from "@/data/DefaultPosts";
import { formatDate } from "@/utils/date";
import { getCategoryColor } from "@/utils/getCategoryDisplayNameAndColor";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import xss from "xss";
import AnimateOnScroll from "../atoms/AnimateOnScroll";

type CategoryConfig = {
  slug: string;
  displayName: string;
};

type Post = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featured_image: string;
  date?: string;
  author: {
    name: string;
  };
};

const categoryConfigs: CategoryConfig[] = [
  {
    slug: "y-hoc-cong-dong",
    displayName: "Y học cộng đồng",
  },
  {
    slug: "san-phu-khoa",
    displayName: "Sản phụ khoa",
  },
  {
    slug: "y-hoc-the-thao",
    displayName: "Y học thể thao",
  },
];

export default function TopCategoryPosts() {
  const [categoryPosts, setCategoryPosts] = useState<Record<string, Post[]>>(
    defaultTopCategoryPosts as Record<string, Post[]>
  );

  useEffect(() => {
    const fetchAllCategoryPosts = async () => {
      const postsData: Record<string, Post[]> = {};
      try {
        await Promise.all(
          categoryConfigs.map(async (category) => {
            const res = await fetch(
              `/api/posts?size=3&offset=0&category=${category.slug}`,
              {
                next: { revalidate: 1 },
              }
            );

            if (!res.ok) {
              throw new Error(`Failed to fetch ${category.displayName} posts`);
            }

            const data = await res.json();
            postsData[category.slug] = data.posts?.length
              ? data.posts
              : (defaultTopCategoryPosts as Record<string, Post[]>)[
                  category.slug
                ] || [];
          })
        );

        setCategoryPosts(postsData);
      } catch (error) {
        console.error("Error fetching category posts:", error);
      }
    };

    fetchAllCategoryPosts();
  }, []);

  return (
    <div className="py-10">
      <div className="flex items-center mb-8">
        <h2 className="text-2xl font-bold text-black mr-2">
          Bài viết chuyên mục hàng đầu
        </h2>
        <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
        <div className="flex-1 gap-2">
          <div className="flex-1 h-[1px] mb-1 bg-gray-200"></div>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {categoryConfigs.map((category, index) => {
          const posts = categoryPosts[category.slug] || [];
          const isNotLast = index < categoryConfigs.length - 1;

          return (
            <div key={category.slug} className="flex flex-col relative">
              {isNotLast && (
                <div className="hidden lg:block absolute right-[-13px] top-0 bottom-0 w-[1px] bg-gray-200 z-10"></div>
              )}

              {posts.length === 0 ? (
                <>
                  <h3 className="text-xl font-bold mb-4">
                    {category.displayName}
                  </h3>
                  <p className="text-gray-500">Không có bài viết.</p>
                </>
              ) : (
                <>
                  <AnimateOnScroll>
                    <div className="mb-6 bg-white overflow-hidden border-b border-gray-200">
                      <div className="relative h-56 overflow-hidden rounded-md">
                        <Image
                          src={posts[0]?.featured_image || "/no-image.jpeg"}
                          alt={posts[0]?.title || ""}
                          fill
                          className="object-cover transition-transform hover:scale-105 rounded-md duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className={`${getCategoryColor(
                              category.slug
                            )} text-white text-xs font-semibold px-3 py-1 rounded-md`}
                          >
                            {category.displayName}
                          </span>
                        </div>
                      </div>
                      <div className="py-4">
                        <h3 className="text-lg font-bold mb-2">
                          <div className="relative overflow-hidden group">
                            <Link href={`/${posts[0]?.slug}`}>
                              <span className="relative inline bg-[linear-gradient(transparent_calc(100%_-_2px),#000000_calc(100%_-_2px))] bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-all duration-1000">
                                {xss(posts[0]?.title || "")}
                              </span>
                            </Link>
                          </div>
                        </h3>
                        {posts[0]?.excerpt && (
                          <p
                            className="text-gray-600 text-sm mb-3 line-clamp-2 overflow-hidden"
                            dangerouslySetInnerHTML={{
                              __html: xss(posts[0].excerpt),
                            }}
                          />
                        )}
                        <div className="flex items-center text-gray-500 text-xs">
                          <span className="mr-1">By</span>
                          <span className="font-medium uppercase mr-2">
                            {posts[0]?.author?.name || "ADMIN"}
                          </span>
                          <span className="mr-2">•</span>
                          <span>{formatDate(posts[0]?.date || "")}</span>
                        </div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                  <div className="space-y-4">
                    {posts.slice(1).map((post, index) => (
                      <AnimateOnScroll key={index}>
                        <div
                          key={post.id}
                          className="border-b pb-4 border-gray-200"
                        >
                          <h4 className="text-base font-bold mb-2">
                            <div className="relative overflow-hidden group">
                              <Link href={`/${post.slug}`}>
                                <span className="relative inline bg-[linear-gradient(transparent_calc(100%_-_1px),#000000_calc(100%_-_1px))] bg-no-repeat bg-[length:0%_100%] group-hover:bg-[length:100%_100%] transition-all duration-1000">
                                  {xss(post.title)}
                                </span>
                              </Link>
                            </div>
                          </h4>
                          <div className="text-gray-400 text-xs mt-1">
                            {formatDate(post.date || "")}
                          </div>
                        </div>
                      </AnimateOnScroll>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
