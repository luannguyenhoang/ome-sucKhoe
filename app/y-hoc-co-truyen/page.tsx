import { getSeoData } from "@/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";
import { Metadata } from "next";
import { GET_SEO_Y_HOC_CO_TRUYEN } from "../api/Graphql/yHocCoTruyen";
import dynamic from "next/dynamic";

const LayoutYHoc = dynamic(() =>
  import("../components/templates/LayoutYHoc").then((mod) => mod.LayoutYHoc)
);

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_SEO_Y_HOC_CO_TRUYEN, "pageBy");

  return {
    ...generateMetadataFromFullHead(
      seo.fullHead || "",
      seo.focusKeywords || ""
    ),
    robots: "index, follow",
  };
}

export default function Page() {
  return <LayoutYHoc path="y-hoc-co-truyen" />;
}
