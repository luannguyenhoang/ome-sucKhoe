import dynamic from "next/dynamic";

const EventSesion4 = dynamic(() =>
  import("../molecules/EventSesion4").then((mod) => mod.EventSesion4)
);
const LayoutNewPosts = dynamic(() =>
  import("../templates/LayoutNewPosts").then((mod) => mod.LayoutNewPosts)
);

const TopCategoryPosts = dynamic(() =>
  import("./TopCategoryPosts").then((mod) => mod)
);

const SliderBar = dynamic(() =>
  import("./SliderBar").then((mod) => mod.SliderBar)
);

export const Sesion4 = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 lg:pt-24 py-12">
      <div className=" lg:col-span-5 px-3 lg:px-0">
        <EventSesion4 />
        <div className="mt-[50px]">
          <LayoutNewPosts
            categorySlug="y-hoc-co-truyen"
            categoryDisplayName="Y học cổ truyền"
          />
          <LayoutNewPosts
            categorySlug="nhi-khoa"
            categoryDisplayName="Nhi khoa"
            marginTop="mt-5"
          />
          <TopCategoryPosts />
        </div>
      </div>
      <div className="lg:col-span-2 justify-center">
        <SliderBar
          showNewPostInDetail={false}
          showForm={true}
          showEvent={false}
          showContact={false}
          showNewPost={false}
          showUpcomingEvents={true}
        />
      </div>
    </div>
  );
};
