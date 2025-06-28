export const defaultPosts: any[] = [
  {
    title: "Phương pháp y học cổ truyền điều trị các bệnh mãn tính hiệu quả",
    slug: "phuong-phap-y-hoc-co-truyen",
    category: "y-hoc-co-truyen",
    featured_image: "/suc-khoe/no-image.jpeg",
    author: "Bs. Nguyễn Văn A",
  },
  {
    title: "Chăm sóc sức khỏe trẻ em trong mùa dịch - Những lưu ý quan trọng",
    slug: "cham-soc-suc-khoe-tre-em",
    category: "nhi-khoa",
    featured_image: "/suc-khoe/no-image.jpeg",
    author: "Bs. Trần Thị B",
  },
  {
    title:
      "Hướng dẫn khám thai định kỳ cho phụ nữ mang thai trong từng giai đoạn",
    slug: "huong-dan-kham-thai-dinh-ky",
    category: "san-phu-khoa",
    featured_image: "/suc-khoe/no-image.jpeg",
    author: "Bs. Lê Thị C",
  },
  {
    title:
      "Phục hồi chấn thương thể thao hiệu quả với các phương pháp hiện đại",
    slug: "phuc-hoi-chan-thuong-the-thao",
    category: "y-hoc-the-thao",
    featured_image: "/suc-khoe/no-image.jpeg",
    author: "Bs. Hoàng Văn D",
  },
];

export const DefaultNewPosts = [
  {
    id: "default-1",
    title: "Bài viết mẫu về sức khỏe và dinh dưỡng",
    slug: "bai-viet-mau-suc-khoe-dinh-duong",
    featured_image: "/suc-khoe/no-image.jpeg",
    excerpt:
      "Đây là bài viết mẫu về các vấn đề sức khỏe thường gặp và cách phòng tránh hiệu quả thông qua chế độ dinh dưỡng phù hợp...",
    author: { name: "Bs. Minh Tâm" },
    categories: ["default"],
  },
  {
    id: "default-2",
    title: "Hướng dẫn chăm sóc sức khỏe hàng ngày cho người bận rộn",
    slug: "huong-dan-cham-soc-suc-khoe-hang-ngay-cho-nguoi-ban-ron",
    featured_image: "/suc-khoe/no-image.jpeg",
    excerpt:
      "Những thói quen đơn giản giúp bạn duy trì sức khỏe tốt mỗi ngày mà không cần tốn nhiều thời gian và công sức, phù hợp với người có lịch trình bận rộn...",
    author: { name: "Bs. Thanh Huyền" },
    categories: ["default"],
  },
  {
    id: "default-3",
    title: "Các bài tập thể dục tại nhà hiệu quả để tăng cường sức khỏe",
    slug: "cac-bai-tap-the-duc-tai-nha-hieu-qua-tang-cuong-suc-khoe",
    featured_image: "/suc-khoe/no-image.jpeg",
    excerpt:
      "Tổng hợp các bài tập thể dục đơn giản nhưng hiệu quả có thể thực hiện tại nhà để cải thiện sức khỏe và tăng cường hệ miễn dịch trong mùa dịch bệnh...",
    author: { name: "Bs. Quang Minh" },
    categories: ["default"],
  },
];

// Default data for TopCategoryPosts component
export const defaultTopCategoryPosts = {
  "y-hoc-cong-dong": [
    {
      id: "yhcd-1",
      title: "Các biện pháp phòng ngừa dịch bệnh trong cộng đồng",
      excerpt:
        "Tìm hiểu về các phương pháp phòng ngừa dịch bệnh hiệu quả cho cộng đồng và gia đình trong mùa dịch...",
      slug: "cac-bien-phap-phong-ngua-dich-benh-trong-cong-dong",
      featured_image: "/suc-khoe/no-image.jpeg",
      author: {
        name: "Bs. Nguyễn Thị Hoa",
      },
    },
    {
      id: "yhcd-2",
      title: "Chương trình tiêm chủng mở rộng cho trẻ em",
      excerpt:
        "Thông tin chi tiết về lịch tiêm chủng và các loại vắc-xin cần thiết cho trẻ em...",
      slug: "chuong-trinh-tiem-chung-mo-rong-cho-tre-em",
      featured_image: "/suc-khoe/no-image.jpeg",
      author: {
        name: "Bs. Trần Văn Minh",
      },
    },
    {
      id: "yhcd-3",
      title: "Tổ chức khám sức khỏe định kỳ cho người cao tuổi",
      excerpt:
        "Hướng dẫn tổ chức khám sức khỏe định kỳ cho người cao tuổi trong cộng đồng...",
      slug: "to-chuc-kham-suc-khoe-dinh-ky-cho-nguoi-cao-tuoi",
      featured_image: "/suc-khoe/no-image.jpeg",
      author: {
        name: "Bs. Lê Thị Mai",
      },
    },
  ],
  "san-phu-khoa": [
    {
      id: "spk-1",
      title: "Chăm sóc sức khỏe phụ nữ mang thai trong ba tháng đầu",
      excerpt:
        "Những lưu ý quan trọng và chế độ dinh dưỡng cho phụ nữ mang thai trong ba tháng đầu...",
      slug: "cham-soc-suc-khoe-phu-nu-mang-thai-trong-ba-thang-dau",
      featured_image: "/suc-khoe/no-image.jpeg",
      author: {
        name: "Bs. Phạm Thị Hương",
      },
    },
    {
      id: "spk-2",
      title: "Các bệnh phụ khoa thường gặp và cách phòng tránh",
      excerpt:
        "Tìm hiểu về các bệnh phụ khoa phổ biến và cách phòng ngừa hiệu quả...",
      slug: "cac-benh-phu-khoa-thuong-gap-va-cach-phong-tranh",
      featured_image: "/suc-khoe/no-image.jpeg",
      author: {
        name: "Bs. Nguyễn Thị Lan",
      },
    },
    {
      id: "spk-3",
      title: "Chuẩn bị tâm lý và sức khỏe trước khi sinh",
      excerpt:
        "Những điều cần biết để chuẩn bị tâm lý và sức khỏe tốt nhất trước khi chuyển dạ...",
      slug: "chuan-bi-tam-ly-va-suc-khoe-truoc-khi-sinh",
      featured_image: "/suc-khoe/no-image.jpeg",
      author: {
        name: "Bs. Trần Thị Hoa",
      },
    },
  ],
  "y-hoc-the-thao": [
    {
      id: "yhtt-1",
      title: "Phòng ngừa chấn thương khi tập luyện thể thao",
      excerpt:
        "Các biện pháp phòng ngừa chấn thương hiệu quả khi tham gia các hoạt động thể thao...",
      slug: "phong-ngua-chan-thuong-khi-tap-luyen-the-thao",
      featured_image: "/suc-khoe/no-image.jpeg",
      author: {
        name: "Bs. Hoàng Minh Tuấn",
      },
    },
    {
      id: "yhtt-2",
      title: "Chế độ dinh dưỡng cho vận động viên chuyên nghiệp",
      excerpt:
        "Hướng dẫn chi tiết về chế độ dinh dưỡng phù hợp cho vận động viên chuyên nghiệp...",
      slug: "che-do-dinh-duong-cho-van-dong-vien-chuyen-nghiep",
      featured_image: "/suc-khoe/no-image.jpeg",
      author: {
        name: "Bs. Nguyễn Văn Hùng",
      },
    },
    {
      id: "yhtt-3",
      title: "Phục hồi sau chấn thương thể thao - Phương pháp và lưu ý",
      excerpt:
        "Các phương pháp và lưu ý quan trọng để phục hồi nhanh chóng sau chấn thương thể thao...",
      slug: "phuc-hoi-sau-chan-thuong-the-thao-phuong-phap-va-luu-y",
      featured_image: "/suc-khoe/no-image.jpeg",
      author: {
        name: "Bs. Trần Đình Long",
      },
    },
  ],
};
