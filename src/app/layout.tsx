import Cta from "@/src/app/components/organisms/Cta";
import Navbar from "@/src/app/components/organisms/Navbar";
import "@/src/styles/globals.css";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getSeoData } from "../utils/getSeoData";
import { generateMetadataFromFullHead } from "../utils/seoUtils";
import { GET_SEO_TRANG_CHU } from "./api/Graphql/trangChu";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_SEO_TRANG_CHU, "pageBy");

  return {
    ...generateMetadataFromFullHead(
      seo.fullHead || "",
      seo.focusKeywords || ""
    ),
    robots: "index, follow"
  };
}
const Footer = dynamic(() =>
  import("./components/molecules/Footer").then((mod) => mod.Footer)
);

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <div className="max-w-[1920px] mx-auto">
          <Navbar />
          {children}
          <Footer />
          <Cta />
        </div>
      </body>
    </html>
  );
}
