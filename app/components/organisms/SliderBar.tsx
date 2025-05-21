import dynamic from "next/dynamic";

const MostViewedPost = dynamic(() =>
  import("./MostViewedPost").then((mod) => mod.MostViewedPost)
);

const SocialMediaContact = dynamic(() =>
  import("../molecules/SocialMediaContact").then(
    (mod) => mod.SocialMediaContact
  )
);

const NewPostInDetailPost = dynamic(() =>
  import("./NewPostInDetailPost").then((mod) => mod.NewPostInDetailPost)
);

const Event = dynamic(() =>
  import("../molecules/Event").then((mod) => mod.Event)
);

const Category = dynamic(() =>
  import("../molecules/Category").then((mod) => mod.Category)
);
const FormWrapper = dynamic(() =>
  import("../molecules/FormWrapper").then((mod) => mod.FormWrapper)
);

export const SliderBar = ({
  showNewPostInDetail = true,
  showContact = true,
  showNewPost = true,
  showEvent = true,
  showCategory = false,
  showForm = false,
}: {
  showNewPostInDetail?: boolean;
  showContact?: boolean;
  showNewPost?: boolean;
  showEvent?: boolean;
  showCategory?: boolean;
  showForm?: boolean;
}) => {
  return (
    <div className="w-full  mx-auto lg:px-0 px-3 sticky top-24">
      {showNewPostInDetail && <NewPostInDetailPost />}
      {showEvent && <Event />}
      {showContact && <SocialMediaContact />}
      {showNewPost && <MostViewedPost />}
      {showCategory && <Category />}
      {showForm && <FormWrapper showTitle={true} />}
    </div>
  );
};
