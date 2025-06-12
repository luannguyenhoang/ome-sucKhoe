"use client";

import { GET_FOOTER } from "@/src/app/api/Graphql/footer";
import { getData } from "@/src/lib/getData";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { menus, TMenuItem } from "@/src/router/router";
import { NewPostInDetailPost } from "../organisms/NewPostInDetailPost";

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


  return (
    <footer className="bg-[#1c1c1c] text-white py-16 mt-11">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="space-y-6 col-span-3">
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
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link
                href={footerData?.url?.linkX || "#"}
                className="w-10 h-10 bg-[#2b2b2b] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="X (Twitter)"
              >
                <Image src={"/x.svg"} alt="X logo" width={20} height={20} />
              </Link>
              <Link
                href={footerData?.url?.linkinstagram || "#"}
                className="w-10 h-10 bg-[#2b2b2b] rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </Link>
            </div>
          </div>

          <div className="col-span-6">
            <h3 className="text-xl font-bold mb-6">Danh mục</h3>
            {(() => {
              const modifiedMenus: TMenuItem[] = [];
              menus.forEach((menuItem: TMenuItem) => {
                if (menuItem.title === "Liên hệ") {
                  return;
                }
                if (menuItem.title === "Y học" && menuItem.childs) {
                  menuItem.childs.forEach(child => {
                    modifiedMenus.push(child);
                  });
                } else {
                  modifiedMenus.push(menuItem);
                }
              });
              const midPoint = Math.ceil(modifiedMenus.length / 2);
              const firstColumn = modifiedMenus.slice(0, midPoint);
              const secondColumn = modifiedMenus.slice(midPoint);
              return (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    {firstColumn.map((menuItem: TMenuItem, index: number) => (
                      <div key={index} className="space-y-2">
                        <Link
                          href={menuItem.path}
                          className="px-3 py-1 bg-[#2b2b2b] text-sm hover:bg-blue-600 transition-colors rounded inline-block"
                        >
                          {menuItem.title}
                        </Link>
                        {menuItem.childs && menuItem.childs.length > 0 && (
                          <div className="flex flex-wrap gap-2 pl-4">
                            {menuItem.childs.map((childItem, childIndex) => (
                              <Link
                                key={`first-${index}-${childIndex}`}
                                href={childItem.path}
                                className="px-2 py-1 bg-[#3b3b3b] text-xs hover:bg-blue-700 transition-colors rounded"
                              >
                                {childItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Second Column */}
                  <div className="space-y-4">
                    {secondColumn.map((menuItem: TMenuItem, index: number) => (
                      <div key={index} className="space-y-2">
                        <Link
                          href={menuItem.path}
                          className="px-3 py-1 bg-[#2b2b2b] text-sm hover:bg-blue-600 transition-colors rounded inline-block"
                        >
                          {menuItem.title}
                        </Link>

                        {menuItem.childs && menuItem.childs.length > 0 && (
                          <div className="flex flex-wrap gap-2 pl-4">
                            {menuItem.childs.map((childItem, childIndex) => (
                              <Link
                                key={`second-${index}-${childIndex}`}
                                href={childItem.path}
                                className="px-2 py-1 bg-[#3b3b3b] text-xs hover:bg-blue-700 transition-colors rounded"
                              >
                                {childItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="col-span-3">
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
