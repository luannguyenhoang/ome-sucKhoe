import dynamic from "next/dynamic";
import { Suspense } from "react";

const CategoryPosts = dynamic(() =>
  import("@/src/app/components/molecules/CategoryPosts").then(
    (mod) => mod.CategoryPosts
  )
);

const WhatsNew = dynamic(() =>
  import("@/src/app/components/molecules/WhatsNew").then((mod) => mod.WhatsNew)
);

const SliderBar = dynamic(() =>
  import("@/src/app/components/organisms/SliderBar").then(
    (mod) => mod.SliderBar
  )
);

export const Sesion2 = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 lg:pt-24 py-12">
      <div className=" lg:col-span-5 px-3 lg:px-0">
        <Suspense fallback={<div className="p-4">Loading categories...</div>}>
          <CategoryPosts />
        </Suspense>
        <div className="mt-[50px]">
          <WhatsNew />
        </div>
      </div>
      <div className="lg:col-span-2 justify-center">
        <SliderBar showNewPostInDetail={false} />
      </div>
    </div>
  );
};
