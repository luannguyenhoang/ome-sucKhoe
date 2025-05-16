import { getSeoData } from "@/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";
import { Metadata } from "next";
import { GET_SEO_TRANG_CHU } from "./api/Graphql/trangChu";
import HomePage from "./home/HomePage";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_SEO_TRANG_CHU, "pageBy");

  return {
    ...generateMetadataFromFullHead(
      seo.fullHead || "",
      seo.focusKeywords || ""
    ),
    robots: "index, follow",
  };
}

export default function Home() {
  return <HomePage />;
}
