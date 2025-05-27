import { getClient } from "@/lib/ApolloClient";
import { replaceSeoRM } from "@/utils/seoRankMath";
import {
  extractMetaContent,
  generateMetadataFromFullHead,
} from "@/utils/seoUtils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { GET_POST_BY_SLUG } from "../api/Graphql/posts";
import { LoadingPost } from "../components/atoms/LoadingPost";
import { LayoutPost } from "../components/templates/LayoutPost";
import LayoutDefault from "../components/templates/LayoutDefault";

const Breadcrumb = dynamic(() =>
  import("../components/atoms/Breadcrumb").then((mod) => mod.Breadcrumb)
);

const BanerPost = dynamic(() =>
  import("../components/atoms/BanerPost").then((mod) => mod.BanerPost)
);

const Post = dynamic(() => import("../post/Post").then((mod) => mod.Post));

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
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Bài viết không tồn tại" };

  return {
    ...generateMetadataFromFullHead(post.seo.fullHead, post.seo.focusKeywords),
  };
}
export const revalidate = 60;
export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
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
