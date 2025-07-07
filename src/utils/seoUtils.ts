import { Metadata } from "next";
import { replaceSeoRM } from "./seoRankMath";

export function extractMetaContent(fullHead: string, key: string): string {
  if (key === "application/ld+json") {
    // Regex để tìm JSON-LD trong thẻ script
    const scriptRegex =
      /<script[^>]+?type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i;
    const scriptMatch = fullHead.match(scriptRegex);
    return scriptMatch ? scriptMatch[1].trim() : "";
  }
  // Regex cho các thẻ meta, link
  const metaRegex = new RegExp(
    `<meta[^>]+?(?:property|name)=["']${key}["'][^>]+?content=["']([^"']+)["']|<link[^>]+?rel=["']${key}["'][^>]+?href=["']([^"']+)["']`,
    "i"
  );
  const metaMatch = fullHead.match(metaRegex);
  return metaMatch ? metaMatch[1] || metaMatch[2] || "" : "";
}

// 📌 Hàm xử lý metadata từ fullHead SEO
export function generateMetadataFromFullHead(
  fullHead: string,
  focusKeywords: string
): Metadata {
  const cleanedFullHead = replaceSeoRM(fullHead);

  return {
    title: extractMetaContent(cleanedFullHead, "og:title") || "",
    keywords: focusKeywords,
    description: extractMetaContent(cleanedFullHead, "description") || "",
    robots: extractMetaContent(cleanedFullHead, "robots") || "index, follow",
    alternates: {
      canonical: extractMetaContent(cleanedFullHead, "canonical") || ""
    },
    openGraph: {
      title: extractMetaContent(cleanedFullHead, "og:title") || "",
      description: extractMetaContent(cleanedFullHead, "og:description") || "",
      url: extractMetaContent(cleanedFullHead, "og:url") || "",
      siteName: extractMetaContent(cleanedFullHead, "og:site_name") || "",
      locale: extractMetaContent(cleanedFullHead, "og:locale") || "vi_VN",
      type: (extractMetaContent(cleanedFullHead, "og:type") ||
        "article") as "article",
      images: [
        {
          url: extractMetaContent(cleanedFullHead, "og:image") || "",
          width: parseInt(
            extractMetaContent(cleanedFullHead, "og:image:width") || "1200"
          ),
          height: parseInt(
            extractMetaContent(cleanedFullHead, "og:image:height") || "630"
          ),
          alt: extractMetaContent(cleanedFullHead, "og:image:alt") || "",
          type: extractMetaContent(cleanedFullHead, "og:image:type") || ""
        }
      ],
      publishedTime:
        extractMetaContent(cleanedFullHead, "article:published_time") || "",
      section: extractMetaContent(cleanedFullHead, "article:section") || ""
    },
    twitter: {
      card:
        (extractMetaContent(cleanedFullHead, "twitter:card") as
          | "summary"
          | "summary_large_image"
          | "player"
          | "app") || "summary_large_image",
      title: extractMetaContent(cleanedFullHead, "twitter:title") || "",
      description:
        extractMetaContent(cleanedFullHead, "twitter:description") || "",
      site: extractMetaContent(cleanedFullHead, "twitter:site") || "",
      creator: extractMetaContent(cleanedFullHead, "twitter:creator") || "",
      images: [extractMetaContent(cleanedFullHead, "twitter:image") || ""]
    }
  };
}
