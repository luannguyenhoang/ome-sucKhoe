"use client";

import { GET_FOOTER } from "@/app/api/Graphql/footer";
import { getData } from "@/lib/getData";
import { toSlug } from "@/utils/toSlug";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { NewPostInDetailPost } from "../organisms/NewPostInDetailPost";
interface PageItem {
  name: string;
}

export const Footer = () => {
  const [footerData, setFooterData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getData(GET_FOOTER);

        if (!response) {
          throw new Error("No data received from API");
        }

        const footer = response.pageBy.trangChu.footer;
        if (!footer) {
          throw new Error("No footer data found in response");
        }

        setFooterData(footer);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch footer data"
        );
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFooter();
  }, []);

  const tags = footerData?.page || [
    "Y học cổ truyền",
    "Nhi khoa",
    "Y học cộng đồng",
    "Sản phụ khoa",
    "Y học thể thao",
  ];

  const defaultPages = [
    { name: "Y học cổ truyền" },
    { name: "Nhi khoa" },
    { name: "Y học cộng đồng" },
    { name: "Sản phụ khoa" },
    { name: "Y học thể thao" },
    { name: "Liên hệ" },
  ];

  const pages = footerData?.page || defaultPages;
  const midPoint = Math.ceil(pages.length / 2);
  const firstColumn = pages.slice(0, midPoint);
  const secondColumn = pages.slice(midPoint);

  return (
    <footer className="bg-[#1c1c1c] text-white py-16 mt-11">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Link href={"/"} className="flex w-full justify-center">
              <Image
                src={footerData?.logo?.node?.mediaItemUrl || "/logo.png"}
                alt="logo"
                width={110}
                height={110}
              />
            </Link>
            <p className="text-gray-400 text-sm">
              {footerData?.description ||
                "When an unknown printer took a galley and scrambled it to make specimen book not only five When an unknown printer took a galley and scrambled it to five centurie."}
            </p>
            <div className="flex space-x-4 justify-center">
              <Link
                href={footerData?.url?.linkFacebook || "#"}
                className="w-10 h-10 bg-[#2b2b2b] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link
                href={footerData?.url?.linkX || "#"}
                className="w-10 h-10 bg-[#2b2b2b] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Image src={"/x.svg"} alt="linkedin" width={20} height={20} />
              </Link>
              <Link
                href={footerData?.url?.linkinstagram || "#"}
                className="w-10 h-10 bg-[#2b2b2b] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Danh mục</h3>
            <div className="flex flex-wrap gap-2">
              {tags
                .filter((tag: PageItem | string) => {
                  const tagName = typeof tag === "string" ? tag : tag.name;
                  return tagName !== "Liên hệ";
                })
                .map((tag: PageItem | string, index: number) => (
                  <Link
                    key={index}
                    href={`/${
                      typeof tag === "string" ? toSlug(tag) : toSlug(tag.name)
                    }`}
                    className="px-3 py-1 bg-[#2b2b2b] text-sm hover:bg-blue-600 transition-colors rounded"
                  >
                    {typeof tag === "string" ? tag : tag.name}
                  </Link>
                ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Trang</h3>
            <div className="grid grid-cols-2 gap-x-4">
              {/* Cột 1 */}
              <ul className="space-y-3">
                {firstColumn.map((page: PageItem, index: number) => (
                  <li key={index}>
                    <Link
                      href={`/${toSlug(page.name)}`}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Cột 2 */}
              <ul className="space-y-3">
                {secondColumn.map((page: PageItem, index: number) => (
                  <li key={index}>
                    <Link
                      href={`/${toSlug(page.name)}`}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Bài viết gần đây</h3>
            <NewPostInDetailPost
              showTitle={false}
              count={2}
              textColor="text-white"
            />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#2b2b2b] text-center text-gray-400 text-sm">
          © 2025 OM&apos;E. All Rights Reserved by OM&apos;E
        </div>
      </div>
    </footer>
  );
};
