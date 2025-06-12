"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";

export default function Navbar({ headerData }: { headerData?: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="bg-white shadow-md  top-0 z-50 lg:px-0 px-4 ">
      <div className="container mx-auto max-w-6xl h-full">
        <div className="flex justify-start items-center gap-10 h-32">
          <div className="flex items-center py-1 relative w-28 h-28">
            <Link href="/" className="">
              <Image
                src={headerData?.logo?.node?.mediaItemUrl || "/logo.png"}
                alt="Logo Đại học Công Đoàn"
                width={112}
                height={112}
                priority={true}
                loading="eager"
                className="w-28 h-28 object-contain"
              />
            </Link>
          </div>

          <DesktopMenu />

          <MobileMenu
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
      </div>
    </div>
  );
}
