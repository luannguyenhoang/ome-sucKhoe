"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const SliderBar = dynamic(() =>
  import("@/src/app/components/organisms/SliderBar").then(
    (mod) => mod.SliderBar
  )
);

const SocialNetworkLinks = dynamic(() =>
  import("@/src/app/components/atoms/SocialNetworkLinks").then(
    (mod) => mod.SocialNetworkLinks
  )
);

export const LayoutPost = ({
  children,
  post,
  m
}: {
  children: ReactNode;
  post: any;
  m?: string;
}) => {
  return (
    <div className="mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
        <div className={`lg:col-span-1 px-3 lg:px-0 w-full  ${m}`}>
          <div className="w-fit mx-auto h-fit sticky top-24 lg:mt-0 mt-20">
            <SocialNetworkLinks
              col={true}
              showTitle={false}
              url={"suc-khoe/" + post?.slug || "#"}
            />
          </div>
        </div>
        <div className="lg:col-span-8 px-3 lg:px-0">{children}</div>
        <div className={`sidebar-posts lg:col-span-3 ${m}`}>
          <SliderBar showNewPost={false} showContact={false} showForm={true} />
        </div>
      </div>
    </div>
  );
};
