"use client";

import React from "react";

export const LoadingListPost = ({
  count,
  col,
  showTitle = false
}: {
  count: number;
  col: number;
  showTitle?: boolean;
}) => {
  return (
    <div className="bg-white rounded-md shadow-sm ">
      {showTitle && (
        <div className="h-10 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
      )}
      <div
        className={`grid grid-cols-1 md:grid-cols-${col} lg:grid-cols-${col} gap-4`}
      >
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className=" gap-4 border-b border-gray-100 pb-4 last:border-0 bg-gray-100 rounded-b-lg"
          >
            <div className="flex-shrink-0 w-full h-[500px] bg-gray-200 rounded-md animate-pulse "></div>
            <div className="flex-grow pt-4 px-2 ">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-2/4 mb-2 animate-pulse"></div>
              <div className="h-3 mb-2 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-3 mb-2 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-3 mb-2 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
