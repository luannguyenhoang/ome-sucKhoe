export const getCategoryDisplayName = (slug?: string): string => {
  if (!slug) return "Y học";
  const categoryMap: { [key: string]: string } = {
    // Main categories
    "y-hoc-co-truyen": "Y học cổ truyền",
    "y-hoc-hien-dai": "Y học hiện đại",
    "van-dong": "Vận động",
    "spa-massage": "Spa & Massage",
    "dinh-duong": "Dinh dưỡng",
    "phuc-hoi-chuc-nang": "Phục hồi chức năng",

    // Y học cổ truyền children
    "xoa-bop-bam-huyet": "Xoa bóp bấm huyệt",
    "duoc-lieu": "Dược liệu",
    "giai-phau-nen-tang": "Giải phẫu nền tảng",
    "duong-sinh-khi-cong": "Dưỡng sinh - Khí công",
    "cham-cuu": "Châm cứu",

    // Y học hiện đại children
    "cham-soc-he-ho-hap": "Chăm sóc hệ hô hấp",
    "cham-soc-he-tieu-hoa": "Chăm sóc hệ tiêu hóa",
    "cham-soc-mat": "Chăm sóc mắt",
    "cham-soc-rang-mieng": "Chăm sóc răng miệng",
    "suc-khoe-nguoi-cao-tuoi": "Sức khỏe người cao tuổi",
    "suc-khoe-phu-nu": "Sức khỏe phụ nữ",
    "suc-khoe-tre-em": "Sức khỏe trẻ em",

    // Vận động children
    "vo-thuat": "Võ thuật",
    "vo-dao": "Võ đạo",
    "gym-yoga": "Gym - Yoga",
    "an-toan-so-cuu": "An toàn & Sơ cứu",

    // Spa - Massage children
    "massage-lam-dep": "Massage làm đẹp",
    "massage-the-thao": "Massage thể thao",
    "goi-dau-duong-sinh": "Gội đầu dưỡng sinh",
    "massage-me-va-be": "Massage mẹ và bé",
    "massage-thu-gian": "Massage thư giãn",
    "massage-tri-lieu": "Massage trị liệu",

    // Dinh dưỡng children
    "dinh-duong-benh-ly": "Dinh dưỡng bệnh lý",
    "dinh-duong-bo-tro": "Dinh dưỡng bổ trợ",
    "dinh-duong-nen-tang": "Dinh dưỡng nền tảng",

    // Phục hồi chức năng children
    "co-xuong-khop": "Cơ xương khớp",
    "ho-hap": "Hô hấp",
    "ngon-ngu-giao-tiep": "Ngôn ngữ và giao tiếp",
    "than-kinh": "Thần kinh",

    "su-kien-sap-toi": "Sự kiện sắp tới",
  };

  const displayName = categoryMap[slug] || "Sức khỏe";
  return displayName;
};

export const getCategoryColor = (slug: string): string => {
  const colorMap: { [key: string]: string } = {
    "y-hoc-co-truyen": "bg-blue-600",
    "y-hoc-hien-dai": "bg-red-500",
    "van-dong": "bg-[#1DA1F2]",
    "spa-massage": "bg-[#0077B5]",
    "dinh-duong": "bg-orange-600",
    "phuc-hoi-chuc-nang": "bg-green-600",
  };

  return colorMap[slug] || "bg-blue-500";
};
