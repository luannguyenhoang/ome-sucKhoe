import { GET_SEO } from "@/src/app/api/Graphql/getSeo";
import { getSeoData } from "@/src/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/src/utils/seoUtils";
import { Metadata } from "next";
import { ReactNode } from "react";

export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const variables = { uri: slug };

  const { seo } = await getSeoData(GET_SEO, "pageBy", [], variables);

  return {
    ...generateMetadataFromFullHead(
      seo.fullHead || "",
      seo.focusKeywords || ""
    ),
    robots: "index, follow"
  };
}

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
