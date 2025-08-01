import dynamic from "next/dynamic";
import FormExcel from "../molecules/FormExcel";

const MostViewedPost = dynamic(() =>
  import("@/src/app/components/organisms/MostViewedPost").then(
    (mod) => mod.MostViewedPost
  )
);

const SocialMediaContact = dynamic(() =>
  import("@/src/app/components/molecules/SocialMediaContact").then(
    (mod) => mod.SocialMediaContact
  )
);

const NewPostInDetailPost = dynamic(() =>
  import("@/src/app/components/organisms/NewPostInDetailPost").then(
    (mod) => mod.NewPostInDetailPost
  )
);

const Event = dynamic(() =>
  import("@/src/app/components/molecules/Event").then((mod) => mod.Event)
);

const Category = dynamic(() =>
  import("@/src/app/components/molecules/Category").then((mod) => mod.Category)
);
const FormWrapper = dynamic(() =>
  import("@/src/app/components/molecules/FormWrapper").then(
    (mod) => mod.FormWrapper
  )
);
const UpcomingEvents = dynamic(() =>
  import("@/src/app/components/organisms/UpcomingEvents").then(
    (mod) => mod.UpcomingEvents
  )
);

export const SliderBar = ({
  showNewPostInDetail = true,
  showContact = true,
  showNewPost = true,
  showEvent = true,
  showCategory = false,
  showForm = false,
  showUpcomingEvents = false,
  path
}: {
  showNewPostInDetail?: boolean;
  showContact?: boolean;
  showNewPost?: boolean;
  showEvent?: boolean;
  showCategory?: boolean;
  showForm?: boolean;
  showUpcomingEvents?: boolean;
  path?: string;
}) => {
  return (
    <div className="w-full  mx-auto lg:px-0 px-3 sticky top-10">
      {showNewPostInDetail && <NewPostInDetailPost />}
      {showEvent && <Event />}
      {showContact && <SocialMediaContact />}
      {showNewPost && <MostViewedPost />}
      {showCategory && <Category path={path} />}
      {showForm && <FormExcel />}
      {showUpcomingEvents && <UpcomingEvents />}
    </div>
  );
};
