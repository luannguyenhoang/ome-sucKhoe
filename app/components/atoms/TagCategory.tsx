"use client";

import {
  getCategoryDisplayName
} from "@/utils/getCategoryDisplayNameAndColor";
import Link from "next/link";

export const TagCategory = ({ categories }: { categories: any }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-semibold">Tags:</div>
      <div className="flex gap-2">
        {categories?.map((category: any, index: number) => (
          <Link
            key={index}
            href={`/${category.slug}`}
            className={`text-gray-600 border border-gray-500 font-medium p-2 text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600  rounded-md `}
          >
            {getCategoryDisplayName(category.slug)}
          </Link>
        ))}
      </div>
    </div>
  );
};
