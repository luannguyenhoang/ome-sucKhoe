"use client";

import { LayoutBottom } from "@/app/components/templates/LayoutBottom";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const ListPosts = dynamic(() =>
  import("./ListPosts").then((mod) => mod.ListPosts)
);

export const Posts = () => {
  const router = useRouter();

  const handleRouter = ({ selected }: { selected: number }) => {
    router.push(`/thu-vien?page=${selected + 1}`);
  };

  return (
    <div>
      <div className="pb-10">
        <LayoutBottom>
          <div>
            <ListPosts handleRouter={handleRouter} />
          </div>
        </LayoutBottom>
      </div>
    </div>
  );
};
