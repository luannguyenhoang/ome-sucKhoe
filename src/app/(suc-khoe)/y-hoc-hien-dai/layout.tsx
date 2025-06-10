import { GET_SEO_Y_HOC_CONG_DONG } from "@/src/app/api/Graphql/yHocCongDong";
import { getSeoData } from "@/src/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/src/utils/seoUtils";
import { Metadata } from "next";
import { ReactNode } from "react";
export const revalidate = 0;
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_SEO_Y_HOC_CONG_DONG, "pageBy");

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
