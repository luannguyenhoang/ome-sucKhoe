import { menus } from "@/src/router/router";
import Link from "next/link";
import { usePathname } from "next/navigation";

const isActive = (pathname: string, path: string): boolean => {
  return pathname === path || !!(pathname && pathname.startsWith(path + "/"));
};

export const DesktopMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex z-50 h-full font-bold  ">
      <ul className="flex space-x-1 h-full">
        {menus.map((item) => (
          <li
            key={item.title}
            className="relative group h-full flex items-center"
          >
            {item.childs ? (
              <div className="flex items-center h-full relative">
                {item.title === "Y học" ? (
                  <div className="px-3 h-full font-bold text-gray-800 hover:text-[#fdc800] flex items-center relative group cursor-pointer">
                    {item.title}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <span
                      className={`absolute bottom-0 left-1/2 h-1 bg-[#fdc800] transform -translate-x-1/2 transition-all duration-300 ${
                        isActive(pathname, item.path || "/")
                          ? "w-[calc(100%-10px)]"
                          : "w-0 group-hover:w-[calc(100%-10px)]"
                      }`}
                    ></span>
                  </div>
                ) : (
                  <Link
                    href={item.path || "/"}
                    className="px-3 h-full font-bold text-gray-800 hover:text-[#fdc800] flex items-center relative group"
                  >
                    {item.title}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <span
                      className={`absolute bottom-0 left-1/2 h-1 bg-[#fdc800] transform -translate-x-1/2 transition-all duration-300 ${
                        isActive(pathname, item.path || "/")
                          ? "w-[calc(100%-10px)]"
                          : "w-0 group-hover:w-[calc(100%-10px)]"
                      }`}
                    ></span>
                  </Link>
                )}

                {/* Dropdown cấp 2 */}
                <div className="absolute top-full left-0 bg-[#002147] shadow-lg w-56 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <ul>
                    {item.childs.map((child) => (
                      <li key={child.title} className="relative group/child">
                        {child.childs ? (
                          <>
                            <Link
                              href={child.path || "/"}
                              className={`px-4 py-3 border-b border-[#1a3b61] flex justify-between items-center transition-colors duration-300 ${
                                isActive(pathname, child.path || "/")
                                  ? "text-[#fdc800] bg-[#1a3b61]"
                                  : "text-white hover:text-[#fdc800] hover:bg-[#1a3b61]"
                              }`}
                            >
                              {child.title}
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className=" h-4 w-4 transform transition-transform group-hover/child:rotate-[-90deg]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </span>
                            </Link>

                            {/* Dropdown cấp 3 - chỉ hiện khi hover cấp 2 */}
                            <div className="absolute top-0 left-full bg-[#002147] shadow-lg w-56 z-20 opacity-0 invisible group-hover/child:opacity-100 group-hover/child:visible transition-all duration-300">
                              <ul>
                                {child.childs.map((subChild) => (
                                  <li key={subChild.title}>
                                    <Link
                                      href={subChild.path || "/"}
                                      className={`px-4 py-3 border-b border-[#1a3b61] block transition-colors duration-300 ${
                                        isActive(pathname, subChild.path || "/")
                                          ? "text-[#fdc800] bg-[#1a3b61]"
                                          : "text-white hover:text-[#fdc800] hover:bg-[#1a3b61]"
                                      }`}
                                    >
                                      {subChild.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <Link
                            href={child.path || "/"}
                            className={`px-4 py-3 border-b border-[#1a3b61] block transition-colors duration-300 ${
                              isActive(pathname, child.path || "/")
                                ? "text-[#fdc800] bg-[#1a3b61]"
                                : "text-white hover:text-[#fdc800] hover:bg-[#1a3b61]"
                            }`}
                          >
                            {child.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : item.title === "y học" ? (
              <div className="px-3 h-full text-gray-800 hover:text-[#fdc800] font-bold flex items-center relative group cursor-pointer">
                {item.title}
                <span
                  className={`absolute bottom-0 left-1/2 h-1 bg-[#fdc800] transform -translate-x-1/2 transition-all duration-300 ${
                    isActive(pathname, item.path || "/")
                      ? "w-[calc(100%-10px)]"
                      : "w-0 group-hover:w-[calc(100%-10px)]"
                  }`}
                ></span>
              </div>
            ) : (
              <Link
                href={item.path || "/"}
                className="px-3 h-full text-gray-800 hover:text-[#fdc800] font-bold flex items-center relative group"
              >
                {item.title}
                <span
                  className={`absolute bottom-0 left-1/2 h-1 bg-[#fdc800] transform -translate-x-1/2 transition-all duration-300 ${
                    isActive(pathname, item.path || "/")
                      ? "w-[calc(100%-10px)]"
                      : "w-0 group-hover:w-[calc(100%-10px)]"
                  }`}
                ></span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
