"use client";

import DesktopMenu from "../molecules/DesktopMenu";
import MobileMenu from "../molecules/MobileMenu";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="border-b border-white shadow-md bg-white">
        <div className="flex items-center px-4 py-2">
          <div className="ml-auto block lg:hidden">
            <MobileMenu />
          </div>
          <div className="flex-1">
            <DesktopMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
