import { getSeoData } from "@/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";
import { Metadata } from "next";
import { ReactNode } from "react";
import { GET_SEO_Y_HOC_THE_THAO } from "../api/Graphql/yHocTheThao";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_SEO_Y_HOC_THE_THAO, "pageBy");

  return {
    ...generateMetadataFromFullHead(
      seo.fullHead || "",
      seo.focusKeywords || ""
    ),
    robots: "index, follow",
  };
}

const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
