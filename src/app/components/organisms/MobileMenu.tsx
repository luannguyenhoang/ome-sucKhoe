import { menus, TMenuItem } from "@/src/router/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NestedMobileItem = ({
  item,
  isActive,
  openSubmenus,
  toggleSubmenu,
  level = 0,
  onClose
}: {
  item: TMenuItem;
  isActive: (path: string) => boolean;
  openSubmenus: Record<string, boolean>;
  toggleSubmenu: (id: string) => void;
  level?: number;
  onClose: () => void;
}) => {
  const itemId = `${level}-${item.path}`;
  const hasChildren = item.childs && item.childs.length > 0;
  const isOpen = openSubmenus[itemId] || false;
  const isYHoc = item.path === "/y-hoc";

  return (
    <li
      className={`relative border-b border-gray-100 ${level > 0 ? "pl-4" : ""}`}
    >
      <div
        className={`flex items-center justify-between cursor-pointer ${
          isActive(item.path) ? "bg-gray-50" : ""
        }`}
      >
        {isYHoc ? (
          <span
            className={`block py-3 px-4 text-gray-800 font-medium flex-grow relative w-full ${
              level > 0 ? "pl-4" : ""
            }`}
          >
            {item.title}
            {isActive(item.path) && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#fdc800]"></span>
            )}
          </span>
        ) : (
          <Link
            href={item.path || "/"}
            className={`block py-3 px-4 text-gray-800 hover:text-[#fdc800] font-medium flex-grow relative w-full ${
              level > 0 ? "pl-4" : ""
            }`}
            onClick={() => onClose()}
          >
            {item.title}
            {isActive(item.path) && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#fdc800]"></span>
            )}
          </Link>
        )}

        {hasChildren && (
          <div
            className="p-3 text-gray-800 w-full flex justify-end"
            onClick={(e) => {
              e.preventDefault();
              toggleSubmenu(itemId);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
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
          </div>
        )}
      </div>

      {hasChildren && isOpen && (
        <ul className="border-t border-gray-100 bg-gray-50">
          {item.childs!.map((childItem) => (
            <NestedMobileItem
              key={childItem.title}
              item={childItem}
              isActive={isActive}
              openSubmenus={openSubmenus}
              toggleSubmenu={toggleSubmenu}
              level={level + 1}
              onClose={onClose}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (mobileMenuOpen: boolean) => void;
}) {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuBottom, setMenuBottom] = useState<number>(0);
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    return pathname === path || !!(pathname && pathname.startsWith(path + "/"));
  };

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";

      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        setMenuBottom(rect.bottom);
      }
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const handleClose = () => {
    setMobileMenuOpen(false);
    setOpenSubmenus({}); // Reset submenu open states
  };

  return (
    <>
      <div className="lg:hidden ml-auto flex items-center">
        <button
          className="text-gray-800 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed left-0 right-0 bottom-0 bg-black bg-opacity-50 z-10"
            style={{ top: menuBottom ? `${menuBottom}px` : "10rem" }}
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            ref={menuRef}
            className="lg:hidden bg-white shadow-lg absolute left-0 right-0 top-32 z-20 max-h-[70vh] overflow-y-auto"
          >
            <nav>
              <ul className="space-y-0">
                {menus.map((item) => (
                  <NestedMobileItem
                    key={item.title}
                    item={item}
                    isActive={isActive}
                    openSubmenus={openSubmenus}
                    toggleSubmenu={toggleSubmenu}
                    onClose={handleClose}
                  />
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
