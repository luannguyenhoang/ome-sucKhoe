export const getCategoryDisplayName = (slug?: string): string => {
  if (!slug) return "Y học";
  const categoryMap: { [key: string]: string } = {
    "y-hoc-co-truyen": "Y học cổ truyền",
    "y-hoc-cong-dong": "Y học cộng đồng",
    "nhi-khoa": "Nhi khoa",
    "san-phu-khoa": "Sản phụ khoa",
    "y-hoc-the-thao": "Y học thể thao",
    "tuyen-dung": "Tuyển dụng",
  };

  const displayName = categoryMap[slug] || "Y học";
  return displayName;
};

export const getCategoryColor = (slug: string): string => {
  const colorMap: { [key: string]: string } = {
    "y-hoc-co-truyen": "bg-blue-600",
    "y-hoc-cong-dong": "bg-red-500",
    "nhi-khoa": "bg-[#1DA1F2]",
    "san-phu-khoa": "bg-[#0077B5]",
    "y-hoc-the-thao": "bg-orange-600",
  };

  return colorMap[slug] || "bg-blue-500";
};
