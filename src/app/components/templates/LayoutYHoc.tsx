"use client";

import ChevronIcon from "@/src/icons/ChevronIcon";
import HomeIcon from "@/src/icons/HomeIcon";
import { getCategoryDisplayName } from "@/src/utils/getCategoryDisplayNameAndColor";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { LayoutBottom } from "./LayoutBottom";
import LayoutDefault from "./LayoutDefault";

const ListPosts = dynamic(() =>
  import("@/src/app/posts/ListPosts").then((mod) => mod.ListPosts)
);

export const LayoutYHoc = ({ path }: { path?: string }) => {
  const router = useRouter();

  const handleRouter = ({ selected }: { selected: number }) => {
    router.push(`${path}?page=${selected + 1}`);
  };

  return (
    <div>
      <div className="py-7 bg- mb-16 bg-[#F7F7F7] lg:px-0 px-3 md:px-3">
        <LayoutDefault>
          <div className="text-3xl mb-2 font-bold text-black">
            {getCategoryDisplayName(path)}
          </div>
          <div className="text-sm  text-gray-500">
            <HomeIcon />
            Trang chủ
            <ChevronIcon />
            <span className="text-green-600">
              {getCategoryDisplayName(path)}
            </span>
          </div>
        </LayoutDefault>
      </div>
      <LayoutDefault>
        <div className="pb-10 md:px-3">
          <LayoutBottom path={path}>
            <div>
              <ListPosts handleRouter={handleRouter} type={path} />
            </div>
          </LayoutBottom>
        </div>
      </LayoutDefault>
    </div>
  );
}
