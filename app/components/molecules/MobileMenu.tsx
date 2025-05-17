"use client";

import { menus } from "@/router";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <div className="block lg:hidden">
      <button
        aria-label="Open menu"
        className="p-2 rounded-md hover:bg-gray-100"
        onClick={onOpen}
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={55}
              height={55}
              style={{ objectFit: "cover" }}
            />
            <p className="text-2xl font-bold">
              OM&apos;E
            </p>
          </div>
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-1">
            {menus.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.href} className="border-none">
                  <Link
                    href={item.href}
                    className={`block py-4 font-medium hover:text-green-500 ${
                      isActive ? 'text-green-500' : 'text-black'
                    }`}
                    onClick={onClose}
                  >
                    {item.title}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
