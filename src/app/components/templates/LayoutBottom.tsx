"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const SliderBar = dynamic(() =>
  import("../organisms/SliderBar").then((mod) => mod.SliderBar)
);

export const LayoutBottom = ({
  children,
  m,
  path
}: {
  children: ReactNode;
  m?: string;
  path?: string;
}) => {
  return (
    <div className="mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-9 px-3 lg:px-0">{children}</div>
        <div className={`sidebar-posts lg:col-span-3 ${m}`}>
          <SliderBar
            showNewPost={false}
            showContact={false}
            showCategory={true}
            path={path}
          />
        </div>
      </div>
    </div>
  );
};
