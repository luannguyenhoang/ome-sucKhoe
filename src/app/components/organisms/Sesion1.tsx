"use client";

import { GET_CATEGORY } from "@/src/app/api/Graphql/category";
import { defaultTopics } from "@/src/data/DefaultDataSession1";
import NextIcon from "@/src/icons/NextIcon";
import PreviousIcon from "@/src/icons/PreviousIcon";
import { getData } from "@/src/lib/getData";
import { Topic } from "@/src/types/Topic";
import { ALLOWED_CATEGORIES } from "@/src/utils/category";
import { toSlug } from "@/src/utils/toSlug";
import Image from "next/image";
import { useEffect, useState } from "react";
import CardTopic from "../atoms/CardTopic";

export const Sesion1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [screenSize, setScreenSize] = useState("lg");
  const [topics, setTopics] = useState<Topic[]>(defaultTopics);
  const [error, setError] = useState<Error | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const data = await getData(GET_CATEGORY);

        if (data?.allCategory?.nodes[0]?.categoryPost?.content) {
          const categoryData =
            data.allCategory.nodes[0].categoryPost.content.map(
              (item: any, index: number) => ({
                id: index + 1,
                title: item.nameCategory,
                imageUrl: item.image.node.mediaItemUrl,
                alt: item.nameCategory,
                slug: toSlug(item.nameCategory),
              })
            );

          const filteredCategoryData = categoryData.filter((category: any) =>
            ALLOWED_CATEGORIES.includes(category.slug)
          );

          const counts: { [key: string]: number } = {};
          await Promise.all(
            filteredCategoryData.map(async (category: any) => {
              try {
                const countRes = await fetch(
                  `/api/posts/count?category=${category.slug}`
                );
                if (countRes.ok) {
                  const countData = await countRes.json();
                  counts[category.title] = countData.total;
                }
              } catch (error) {
                console.error(
                  `Error fetching count for category ${category.title}:`,
                  error
                );
                counts[category.title] = 0;
              }
            })
          );

          setCategoryCounts(counts);
          setTopics(
            filteredCategoryData.map((category: any) => ({
              ...category,
              countPosts: counts[category.title] || 0,
            }))
          );
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch categories")
        );
        console.error("Failed to fetch categories:", err);
        setTopics(defaultTopics);
      }
      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.matchMedia("(max-width: 639px)").matches) {
        setScreenSize("sm");
        setItemsPerPage(1);
      } else if (window.matchMedia("(max-width: 1023px)").matches) {
        setScreenSize("md");
        setItemsPerPage(2);
      } else {
        setScreenSize("lg");
        setItemsPerPage(4);
      }

      setCurrentIndex(0);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : topics.length - itemsPerPage
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < topics.length - itemsPerPage ? prev + 1 : 0
    );
  };

  const getContainerWidth = () => {
    switch (screenSize) {
      case "sm":
        return "w-full";
      case "md":
        return "w-[calc(2*14rem+1*1rem)]";
      default:
        return "w-[calc(4*14rem+3*1rem)]";
    }
  };

  const getTransformStyle = () => {
    if (screenSize === "sm") {
      return { transform: `translateX(-${currentIndex * 100}%)` };
    } else {
      return { transform: `translateX(-${currentIndex * (14 + 1)}rem)` };
    }
  };

  if (error) return <div>Dữ liệu đang được cập nhật</div>;

  return (
    <div className="max-w-7xl lg:mt-[-100px] lg:pt-0 mt-16 bg-white border border-gray-100 rounded-2xl shadow-2xl mx-2 lg:px-0 relative">
      <div className="absolute bottom-[-40px] left-[-50px] z-[-1]  lg:block hidden">
        <Image
          src={"/element.png"}
          alt="decorative element"
          width={110}
          height={120}
        />
      </div>
      <div className="absolute bottom-[-40px] right-[-50px] z-[-1] lg:block hidden">
        <Image
          src={"/elemen2.png"}
          alt="decorative element"
          width={70}
          height={70}
        />
      </div>
      <div
        className={`flex p-10 flex-col !z-30 ${
          screenSize === "sm"
            ? "space-y-6"
            : "sm:flex-row sm:items-center sm:space-x-6"
        } justify-between w-full`}
      >
        <div
          className={`flex ${
            screenSize === "sm" ? "w-full" : "lg:flex-col"
          } justify-between lg:items-center mb-4 sm:mb-0 sm:w-48`}
        >
          <h2 className="text-black my-auto font-bold text-xl leading-tight ld:max-w-[10px] ">
            Danh mục tin tức hot nhất
          </h2>
          <div className="lg:mt-4 flex space-x-2 lg:w-full">
            <button
              aria-label="Previous"
              className="w-8 h-8 border border-gray-300 rounded text-black flex items-center justify-center hover:bg-gray-100"
              onClick={handlePrevious}
            >
              <PreviousIcon />
            </button>
            <button
              aria-label="Next"
              className="w-8 h-8 border border-gray-300 rounded text-black flex items-center justify-center hover:bg-gray-100"
              onClick={handleNext}
            >
              <NextIcon />
            </button>
          </div>
        </div>
        <div className={`relative overflow-hidden ${getContainerWidth()}`}>
          <div
            className="flex transition-transform duration-300 ease-in-out w-full"
            style={getTransformStyle()}
          >
            {isLoading
              ? Array(itemsPerPage)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className={`relative rounded-md overflow-hidden ${
                        screenSize === "sm" ? "w-full" : "w-56 mr-4"
                      } h-64 flex-shrink-0 bg-gray-200 animate-pulse`}
                    >
                      <div className="absolute bottom-3 w-full flex flex-col items-center justify-center">
                        <div className="h-6 bg-gray-300 rounded w-28 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-10"></div>
                      </div>
                    </div>
                  ))
              : topics.map((topic) => (
                  <CardTopic
                    key={topic.id}
                    topic={topic}
                    screenSize={screenSize}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
