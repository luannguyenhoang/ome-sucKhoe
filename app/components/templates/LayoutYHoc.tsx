"use client";

import ChevronIcon from "@/icons/ChevronIcon";
import HomeIcon from "@/icons/HomeIcon";
import { getCategoryDisplayName } from "@/utils/getCategoryDisplayNameAndColor";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import DefaultLayout from "./DefaultLayout";
import { LayoutBottom } from "./LayoutBottom";

const ListPosts = dynamic(() =>
  import("@/app/posts/ListPosts").then((mod) => mod.ListPosts)
);

export default function LayoutYHoc({ path }: { path?: string }) {
  const router = useRouter();

  const handleRouter = ({ selected }: { selected: number }) => {
    router.push(`${path}?page=${selected + 1}`);
  };

  return (
    <div>
      <div className="py-7 bg- mb-16 bg-[#F7F7F7] lg:px-0 px-3 md:px-3">
        <DefaultLayout>
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
        </DefaultLayout>
      </div>
      <DefaultLayout>
        <div className="pb-10 md:px-3">
          <LayoutBottom>
            <div>
              <ListPosts handleRouter={handleRouter} type={path} />
            </div>
          </LayoutBottom>
        </div>
      </DefaultLayout>
    </div>
  );
}
