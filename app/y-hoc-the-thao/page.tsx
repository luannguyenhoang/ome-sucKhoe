import { getSeoData } from "@/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";
import { Metadata } from "next";
import { GET_SEO_Y_HOC_THE_THAO } from "../api/Graphql/yHocTheThao";
import LayoutYHoc from "../components/templates/LayoutYHoc";

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

export default function Page() {
  return <LayoutYHoc path="y-hoc-the-thao" />;
}
