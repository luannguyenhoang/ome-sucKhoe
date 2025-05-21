"use client";

import { GET_CATEGORY } from "@/app/api/Graphql/category";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";
import CardCategory from "../atoms/CardCategory";

export const Category = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await getData(GET_CATEGORY);

        if (data?.allCategory?.nodes[0]?.categoryPost?.content) {
          const categoryData = data.allCategory.nodes[0].categoryPost.content;
          const categoriesWithCount = await Promise.all(
            categoryData.map(async (item: any) => {
              const categoryName = item.nameCategory;
              const slug = categoryName.toLowerCase().replace(/\s+/g, "-");

              try {
                const countRes = await fetch(
                  `/api/posts/count?category=${categoryName}`
                );
                const countData = await countRes.json();

                return {
                  title: categoryName,
                  image: item.image.node.mediaItemUrl,
                  count: countData.total || 0,
                  link: `/${slug}`,
                };
              } catch (error) {
                console.error(
                  `Error fetching count for ${categoryName}:`,
                  error
                );
                return {
                  title: categoryName,
                  image: item.image.node.mediaItemUrl,
                  count: 0,
                  link: `/${slug}`,
                };
              }
            })
          );

          setCategories(categoriesWithCount);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch categories")
        );
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return (
      <div className="mb-8 text-center text-red-600">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center mb-7 pt-5">
        <h2 className="text-2xl font-bold text-black mr-2 uppercase">
          DANH MỤC TIN TỨC
        </h2>
        <div className="h-2 w-2 rounded-full bg-blue-600 mr-1"></div>
        <div className="flex-1 gap-2">
          <div className="flex-1 h-[1px] mb-1 bg-gray-200"></div>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((category, index) => (
          <CardCategory key={index} category={category} />
        ))}
      </div>
    </div>
  );
};
