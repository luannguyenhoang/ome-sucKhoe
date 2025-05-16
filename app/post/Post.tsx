import "server-only";

import { clean } from "@/lib/sanitizeHtml";
import styles from "@/styles/Post.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";

const TagCategory = dynamic(() =>
  import("@/app/components/atoms/TagCategory").then((mod) => mod.TagCategory)
);

const SocialNetworkLinks = dynamic(() =>
  import("../components/atoms/SocialNetworkLinks").then(
    (mod) => mod.SocialNetworkLinks
  )
);

export const Post = ({ post }: { post: any }) => {
  return (
    <>
      <article className={styles["post"]}>
        <main>
          {post && (
            <>
              <div className={styles["post__main"] + " lg:px-0"}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: clean(post?.content),
                  }}
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start gap-4  mt-6">
                <div className="w-full ">
                  <TagCategory categories={post?.categories} />
                </div>
                <div className="w-full ">
                  <SocialNetworkLinks url={post?.slug || "#"} />
                </div>
              </div>
              {/* <Comments post={post?.slug } /> */}
              {/* <SamePosts categories={categories} currentSlug={post?.slug} /> */}
            </>
          )}

          {!post && (
            <div className={styles["not-found"]}>
              <p>Bài viết này không tồn tại !</p>
              <Link className={styles["back-new"]} href={`/`}>
                Trở về trang trang chủ
              </Link>
            </div>
          )}
        </main>
      </article>
    </>
  );
};
