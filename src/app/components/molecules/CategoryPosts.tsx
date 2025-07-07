"use client";

import { formatDate } from "@/src/utils/date";
import {
  getCategoryColor,
  getCategoryDisplayName
} from "@/src/utils/getCategoryDisplayNameAndColor";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import xss from "xss";
import CardPostCategory from "../atoms/CardPostCategory";
import CategoryTabs from "../atoms/CategoryTabs";
import LoadingOverlay from "../atoms/LoadingOverlay";
import { ALLOWED_CATEGORIES } from "@/src/utils/category";
import { menus } from "@/src/router/router";
import { LoadingListPost } from "../atoms/LoadingListPost";

export const CategoryPosts = () => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const first = 50000;
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [totalPosts, setTotalPosts] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] =
    useState<string>("y-hoc-co-truyen");
  const [displayCategory, setDisplayCategory] =
    useState<string>("y-hoc-co-truyen");
  const [selectedTabCategory, setSelectedTabCategory] =
    useState<string>("y-hoc-co-truyen");
  const [isPendingCategoryChange, setIsPendingCategoryChange] = useState(false);

  const getSubcategorySlugs = (category: string): string[] => {
    for (const menu of menus) {
      const menuPath = menu.path.startsWith("/")
        ? menu.path.substring(1)
        : menu.path;

      if (menuPath === category) {
        if (menu.childs) {
          return menu.childs.map((child) => {
            const pathParts = child.path.split("/");
            return pathParts[pathParts.length - 1];
          });
        }
        return [];
      }

      if (menu.childs) {
        for (const child of menu.childs) {
          const childPath = child.path.startsWith("/")
            ? child.path.substring(1)
            : child.path;
          const childSlug = childPath.split("/").pop() || "";

          if (childSlug === category || childPath === category) {
            if (child.childs) {
              return child.childs.map((grandchild) => {
                const pathParts = grandchild.path.split("/");
                return pathParts[pathParts.length - 1];
              });
            }
            return [];
          }

          if (menu.path === "/y-hoc" && child.childs) {
            for (const grandchild of child.childs) {
              const grandchildPath = grandchild.path.startsWith("/")
                ? grandchild.path.substring(1)
                : grandchild.path;
              const grandchildSlug = grandchildPath.split("/").pop() || "";

              if (grandchildSlug === category) {
                return [];
              }
            }
          }
        }
      }
    }

    return [];
  };

  useEffect(() => {
    const getPosts = async () => {
      if (isLoading) {
        try {
          let url = `/suc-khoe/api/posts?&size=${first * 3}&offset=${
            (page - 1) * first
          }`;
          url += `&category=${activeCategory}`;
          url += `&additionalCategory=pho-bien-nhat`;
          const res = await fetch(url, {
            next: { revalidate: 1 }
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

  useEffect(() => {
    if (posts.length > 0) {
      const subcategorySlugs = getSubcategorySlugs(activeCategory);
      if (subcategorySlugs.length === 0) {
        setFilteredPosts([]);
        return;
      }
      const filtered = posts.filter((post) => {
        const hasSubcategory = post.categories.some((category: string) => {
          if (category === activeCategory) {
            return false;
          }
          const slug = category.split("/").pop() || category;
          return subcategorySlugs.includes(slug);
        });
        return hasSubcategory;
      });
      setFilteredPosts(filtered.length > 0 ? filtered : []);
    } else {
      setFilteredPosts([]);
    }
  }, [posts, activeCategory]);

  const handleCategoryChange = (index: number) => {
    if (ALLOWED_CATEGORIES[index] !== activeCategory) {
      const selectedCategory = ALLOWED_CATEGORIES[index];
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

      {filteredPosts.length === 0 && !isLoading && !posts == null ? (
        <div className="max-w-[900px] mx-auto text-center py-8 text-black">
          <p>Không có bài viết nào trong danh mục này.</p>
        </div>
      ) : (
        <div className="relative">
          {isLoading && (
            <>
              <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                <div className="relative rounded-md overflow-hidden aspect-[16/14] bg-gray-200 animate-pulse">
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="w-20 h-6 bg-gray-300 rounded-sm mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mt-3"></div>
                  </div>
                </div>
                <div className="gap-3 flex flex-col justify-between">
                  {[0, 1].map((index) => (
                    <div
                      key={index}
                      className="flex space-x-4 items-center bg-white rounded-md"
                    >
                      <div className="relative flex-shrink-0 overflow-hidden rounded-md w-[180px] h-[180px] bg-gray-200 animate-pulse"></div>
                      <div className="flex flex-col justify-start">
                        <div className="w-40 h-[29px] bg-gray-300 rounded-sm mb-4"></div>
                        <div className="h-5 bg-gray-300 rounded w-28 mb-1"></div>
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/3 mt-2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
                {[0, 1].map((index) => (
                  <div
                    key={index}
                    className="flex space-x-4 items-center bg-white rounded-md"
                  >
                    <div className="relative flex-shrink-0 overflow-hidden rounded-md w-[180px] h-[180px] bg-gray-200 animate-pulse"></div>
                    <div className="flex flex-col justify-start">
                      <div className="w-40 h-[29px] bg-gray-300 rounded-sm mb-4"></div>
                      <div className="h-5 bg-gray-300 rounded w-28 mb-1"></div>
                      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/3 mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            {filteredPosts.length > 0 && (
              <Link
                href={`/${filteredPosts[0]?.slug}`}
                className="relative rounded-md overflow-hidden aspect-[16/14] group"
              >
                <Image
                  src={
                    filteredPosts[0]?.featured_image ||
                    "/suc-khoe/no-image.jpeg"
                  }
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
                    {getCategoryDisplayName(
                      filteredPosts[0]?.categories[0] === "pho-bien-nhat"
                        ? filteredPosts[0]?.categories[1]
                        : filteredPosts[0]?.categories[0]
                    ) || "Category"}
                  </span>
                  <div className="relative overflow-hidden group/title">
                    <h2 className="text-2xl font-bold leading-tight">
                      <span className="relative inline bg-[linear-gradient(transparent_calc(100%_-_2px),#FFFFFFFF_calc(100%_-_2px))] bg-no-repeat bg-[length:0%_100%] group-hover/title:bg-[length:100%_100%] transition-all duration-1000">
                        {filteredPosts[0]?.title || "Post Title"}
                      </span>
                    </h2>
                  </div>
                  <div className="flex items-center space-x-4 mt-3 text-xs font text-white/80 uppercase">
                    {filteredPosts[0]?.author && (
                      <span>by {filteredPosts[0].author}</span>
                    )}
                    <span className="flex items-center space-x-1">
                      <span>
                        {formatDate(filteredPosts[0]?.date || "Date")}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-md pointer-events-none" />
              </Link>
            )}
            <div className="gap-3 flex flex-col justify-between">
              {filteredPosts.slice(1, 3).map((post: any, index: number) => {
                return (
                  <CardPostCategory
                    key={index}
                    title={xss(post?.title)}
                    desc={xss(post?.excerpt)}
                    image={post?.featured_image || ""}
                    path={`${post?.slug}`}
                    category={
                      post?.categories[0] === "pho-bien-nhat"
                        ? post?.categories[1]
                        : post?.categories[0]
                    }
                    date={post?.date}
                  />
                );
              })}
            </div>
          </div>
          <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            {filteredPosts.slice(3, 5).map((post: any, index: number) => {
              return (
                <CardPostCategory
                  key={index}
                  title={xss(post?.title)}
                  desc={xss(post?.excerpt)}
                  image={post?.featured_image || ""}
                  path={`${post?.slug}`}
                  category={
                    post?.categories[0] === "pho-bien-nhat"
                      ? post?.categories[1]
                      : post?.categories[0]
                  }
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
