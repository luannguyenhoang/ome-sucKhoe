"use client";

import { categories } from "@/utils/category";
import { formatDate } from "@/utils/date";
import {
  getCategoryColor,
  getCategoryDisplayName,
} from "@/utils/getCategoryDisplayNameAndColor";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import xss from "xss";
import CardPostCategory from "../atoms/CardPostCategory";
import CategoryTabs from "../atoms/CategoryTabs";
import LoadingOverlay from "../atoms/LoadingOverlay";

export const CategoryPosts = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const first = 8;

  const [posts, setPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] =
    useState<string>("y-hoc-co-truyen");
  const [displayCategory, setDisplayCategory] =
    useState<string>("y-hoc-co-truyen");
  const [selectedTabCategory, setSelectedTabCategory] =
    useState<string>("y-hoc-co-truyen");
  const [isPendingCategoryChange, setIsPendingCategoryChange] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      if (isLoading) {
        try {
          let url = `/api/posts?&size=${first}&offset=${(page - 1) * first}`;
          url += `&category=${activeCategory}`;
          url += `&additionalCategory=pho-bien-nhat`;
          const res = await fetch(url, {
            next: { revalidate: 1 },
          });

          if (!res.ok) {
            throw new Error(
              `Posts fetch failed with status: ${res.statusText}`
            );
          }

          const data: { posts: any[]; totalPosts: string } = await res.json();
          const { posts, totalPosts } = data;

          if (posts?.length) {
            setPosts(posts);
            setTotalPosts(totalPosts);
          } else {
            setPosts([]);
            setTotalPosts("0");
          }
          setDisplayCategory(activeCategory);
          setIsPendingCategoryChange(false);
        } catch (error) {
          console.error("Error fetching posts:", error);
          setPosts([]);
          setTotalPosts("0");
          setIsPendingCategoryChange(false);
        }

        setIsLoading(false);
      }
    };

    getPosts();
  }, [isLoading, activeCategory, page]);

  const handleCategoryChange = (index: number) => {
    if (categories[index] !== activeCategory) {
      const selectedCategory = categories[index];
      setSelectedTabCategory(selectedCategory);
      setActiveCategory(selectedCategory);
      setIsPendingCategoryChange(true);
      setIsLoading(true);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-[900px] mx-auto mb-8">
        <div className="lg:flex items-center justify-between mb-4">
          <CategoryTabs
            selectedTabCategory={selectedTabCategory}
            isPendingCategoryChange={isPendingCategoryChange}
            isLoading={isLoading}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      {posts.length === 0 && !isLoading ? (
        <div className="max-w-[900px] mx-auto text-center py-8 text-black">
          <p>Không có bài viết nào trong danh mục này.</p>
        </div>
      ) : (
        <div className="relative">
          {isLoading && <LoadingOverlay />}
          <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            <Link
              href={`/${posts[0]?.slug}`}
              className="relative rounded-md overflow-hidden aspect-[16/14] group"
            >
              <Image
                src={posts[0]?.featured_image || "/no-image.jpeg"}
                alt="Featured post"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 900px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                <span
                  className={`inline-block ${
                    getCategoryColor(displayCategory) || "bg-blue-500"
                  } text-xs font-semibold px-2 py-1 rounded-sm mb-2`}
                >
                  {getCategoryDisplayName(displayCategory) || "Category"}
                </span>
                <h2 className="text-2xl font-bold leading-tight">
                  {posts[0]?.title || "Post Title"}
                </h2>
                <div className="flex items-center space-x-4 mt-3 text-xs font text-white/80 uppercase">
                  {posts[0]?.author && <span>by {posts[0].author}</span>}
                  <span className="flex items-center space-x-1">
                    <span>{formatDate(posts[0]?.date || "Date")}</span>
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-md pointer-events-none" />
            </Link>
            <div className="gap-3 flex flex-col justify-between">
              {posts.slice(1, 3).map((post: any, index: number) => {
                return (
                  <CardPostCategory
                    key={index}
                    title={xss(post?.title)}
                    desc={xss(post?.excerpt)}
                    image={post?.featured_image || ""}
                    path={`/${post?.slug}`}
                    category={displayCategory}
                    date={post?.date}
                  />
                );
              })}
            </div>
          </div>
          <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            {posts.slice(3,5).map((post: any, index: number) => {
              return (
                <CardPostCategory
                  key={index}
                  title={xss(post?.title)}
                  desc={xss(post?.excerpt)}
                  image={post?.featured_image || ""}
                  path={`/${post?.slug}`}
                  category={displayCategory}
                  date={post?.date}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
