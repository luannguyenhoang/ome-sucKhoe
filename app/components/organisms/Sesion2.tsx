import dynamic from "next/dynamic";

const CategoryPosts = dynamic(() =>
  import("../molecules/CategoryPosts").then((mod) => mod.CategoryPosts)
);

const WhatsNew = dynamic(() =>
  import("../molecules/WhatsNew").then((mod) => mod.WhatsNew)
);

const SliderBar = dynamic(() =>
  import("./SliderBar").then((mod) => mod.SliderBar)
);

export const Sesion2 = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 lg:pt-24 py-12">
      <div className=" lg:col-span-5 px-3 lg:px-0">
        <CategoryPosts />
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
