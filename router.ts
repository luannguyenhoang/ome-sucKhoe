export const menus = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Y học cổ truyền",
    href: "/y-hoc-co-truyen",
  },
  {
    title: "Y học cộng đồng",
    href: "/y-hoc-cong-dong",
  },
  {
    title: "Nhi khoa",
    href: "/nhi-khoa",
  },
  {
    title: "Sản phụ khoa",
    href: "/san-phu-khoa",
  },
  {
    title: "Y học thể thao",
    href: "/y-hoc-the-thao",
  },
  {
    title: "Liên hệ",
    href: "/lien-he",
  },
];

export type TMenu = {
  title: string;
  href: string;
};

export type TMenus = TMenu[];
