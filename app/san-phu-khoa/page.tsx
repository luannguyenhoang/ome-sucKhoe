import { getSeoData } from "@/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/utils/seoUtils";
import { Metadata } from "next";
import { GET_SEO_SAN_PHU_KHOA } from "../api/Graphql/sanPhuKhoa";
import LayoutYHoc from "../components/templates/LayoutYHoc";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_SEO_SAN_PHU_KHOA, "pageBy");

  return {
    ...generateMetadataFromFullHead(
      seo.fullHead || "",
      seo.focusKeywords || ""
    ),
    robots: "index, follow",
  };
}

export default function Page() {
  return <LayoutYHoc path="san-phu-khoa" />;
}
