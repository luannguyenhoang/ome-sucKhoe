"use client";

import { menus } from "@/router";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DesktopMenu() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hidden lg:block w-full transition-all duration-300 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="py-2 flex justify-center items-center gap-10">
          <div className="mr-0 lg:mr-4 flex justify-center items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={54}
              height={54}
              style={{ objectFit: "cover" }}
            />
            <p className="text-[25px] font-bold text-black">
              OM&apos;E
            </p>
          </div>
          <div className="flex space-x-4">
            {menus.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    text-end w-fit text-[15px] font-bold 
                    ${isActive ? 'text-[#026039]' : 'text-gray-800'} 
                    relative flex items-center gap-1 px-2 whitespace-nowrap
                    hover:text-[#026039] group
                  `}
                >
                  <span>{item.title}</span>
                  <span className="absolute w-0 h-0.5 bottom-[-4px] left-1/2 transform -translate-x-1/2 bg-[#026039] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
