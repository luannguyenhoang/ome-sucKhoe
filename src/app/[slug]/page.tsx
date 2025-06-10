import { GET_POST_BY_SLUG } from "@/src/app/api/Graphql/posts";
import { LoadingPost } from "@/src/app/components/atoms/LoadingPost";
import LayoutDefault from "@/src/app/components/templates/LayoutDefault";
import { LayoutPost } from "@/src/app/components/templates/LayoutPost";
import { getClient } from "@/src/lib/ApolloClient";
import { replaceSeoRM } from "@/src/utils/seoRankMath";
import {
  extractMetaContent,
  generateMetadataFromFullHead,
} from "@/src/utils/seoUtils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Breadcrumb = dynamic(() =>
  import("@/src/app/components/atoms/Breadcrumb").then((mod) => mod.Breadcrumb)
);

const BanerPost = dynamic(() =>
  import("@/src/app/components/atoms/BanerPost").then((mod) => mod.BanerPost)
);

const Post = dynamic(() =>
  import("@/src/app/post/Post").then((mod) => mod.Post)
);

async function getPost(slug: string) {
  try {
    const { data, errors } = await getClient().query({
      query: GET_POST_BY_SLUG,
      variables: { id: slug },
    });

    if (errors || !data?.post) {
      return null;
    }

    const categories = data.post.categories?.nodes || [];

    return {
      id: data.post.id,
      title: data.post.title,
      slug: data.post.slug,
      date: data.post.date,
      content: data.post.content,
      featuredImage: data.post.featuredImage?.node?.mediaItemUrl || "",
      categories: categories.map((cat: any) => ({
        slug: cat.slug,
      })),

      seo: {
        fullHead: data.post.seo?.fullHead || "",
        title: data.post.seo?.title || "",
        focusKeywords: data.post.seo?.focusKeywords || "",
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Bài viết không tồn tại" };

  return {
    ...generateMetadataFromFullHead(post.seo.fullHead, post.seo.focusKeywords),
  };
}
export const revalidate = 60;
export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  const processedFullHead = replaceSeoRM(post?.seo.fullHead);
  const jsonLdContent = extractMetaContent(
    processedFullHead,
    "application/ld+json"
  );

  return (
    <>
      <div className="py-8 bg-[#F7F7F7] lg:px-0 px-3">
        <LayoutDefault>
          <Breadcrumb post={post} />
        </LayoutDefault>
      </div>
      <BanerPost post={post} />
      <LayoutDefault>
        <LayoutPost post={post} m="lg:mt-20">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: jsonLdContent,
            }}
          />
          <Suspense fallback={<LoadingPost count={1} />}>
            <Post post={post} />
          </Suspense>
        </LayoutPost>
      </LayoutDefault>
    </>
  );
}
