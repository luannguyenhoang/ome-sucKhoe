export type TMenuItem = {
  path: string;
  title: string;
  childs?: TMenuItem[];
};

export type TMenus = TMenuItem[];

export const menus: TMenus = [
  {
    path: "/y-hoc",
    title: "Y học",
    childs: [
      {
        path: "/y-hoc-co-truyen",
        title: "Y học cổ truyền",
        childs: [
          {
            path: "/y-hoc-co-truyen/xoa-bop-bam-huyet",
            title: "Xoa bóp bấm huyệt"
          },
          {
            path: "/y-hoc-co-truyen/duoc-lieu",
            title: "Dược liệu"
          },
          {
            path: "/y-hoc-co-truyen/giai-phau-nen-tang",
            title: "Giải phẫu nền tảng"
          },
          {
            path: "/y-hoc-co-truyen/duong-sinh-khi-cong",
            title: "Dưỡng sinh - Khí công"
          },
          {
            path: "/y-hoc-co-truyen/cham-cuu",
            title: "Châm cứu"
          }
        ]
      },

      {
        path: "/y-hoc-hien-dai",
        title: "Y học hiện đại",
        childs: [
          {
            path: "/y-hoc-hien-dai/cham-soc-he-ho-hap",
            title: "Chăm sóc hệ hô hấp"
          },
          {
            path: "/y-hoc-hien-dai/cham-soc-he-tieu-hoa",
            title: "Chăm sóc hệ tiêu hóa"
          },
          {
            path: "/y-hoc-hien-dai/cham-soc-mat",
            title: "Chăm sóc mắt"
          },
          {
            path: "/y-hoc-hien-dai/cham-soc-rang-mieng",
            title: "Chăm sóc răng miệng"
          },
          {
            path: "/y-hoc-hien-dai/suc-khoe-nguoi-cao-tuoi",
            title: "Sức khỏe người cao tuổi"
          },
          {
            path: "/y-hoc-hien-dai/suc-khoe-phu-nu",
            title: "Sức khỏe phụ nữ"
          },
          {
            path: "/y-hoc-hien-dai/suc-khoe-tre-em",
            title: "Sức khỏe trẻ em"
          }
        ]
      }
    ]
  },

  {
    path: "/van-dong",
    title: "Vận động",
    childs: [
      {
        path: "/van-dong/vo-thuat",
        title: "Võ thuật"
      },
      {
        path: "/van-dong/vo-dao",
        title: "Võ đạo"
      },
      {
        path: "/van-dong/gym-yoga",
        title: "Gym - Yoga"
      },
      {
        path: "/van-dong/an-toan-so-cuu",
        title: "An toàn & Sơ cứu"
      }
    ]
  },
  {
    path: "/spa-massage",
    title: "Spa & Massage",
    childs: [
      {
        path: "/spa-massage/massage-lam-dep",
        title: "Massage làm đẹp"
      },
      {
        path: "/spa-massage/massage-the-thao",
        title: "Massage thể thao"
      },
      {
        path: "/spa-massage/goi-dau-duong-sinh",
        title: "Gội đầu dưỡng sinh"
      },
      {
        path: "/spa-massage/massage-me-va-be",
        title: "Massage mẹ và bé"
      },
      {
        path: "/spa-massage/massage-thu-gian",
        title: "Massage thư giãn"
      },
      {
        path: "/spa-massage/massage-tri-lieu",
        title: "Massage trị liệu"
      }
    ]
  },
  {
    path: "/dinh-duong",
    title: "Dinh dưỡng",
    childs: [
      {
        path: "/dinh-duong/dinh-duong-benh-ly",
        title: "Dinh dưỡng bệnh lý"
      },
      {
        path: "/dinh-duong/dinh-duong-bo-tro",
        title: "Dinh dưỡng bổ trợ"
      },
      {
        path: "/dinh-duong/dinh-duong-nen-tang",
        title: "Dinh dưỡng nền tảng"
      }
    ]
  },
  {
    path: "/phuc-hoi-chuc-nang",
    title: "Phục hồi chức năng",
    childs: [
      {
        path: "/phuc-hoi-chuc-nang/co-xuong-khop",
        title: "Cơ xương khớp"
      },
      {
        path: "/phuc-hoi-chuc-nang/ho-hap",
        title: "Hô hấp"
      },
      {
        path: "/phuc-hoi-chuc-nang/ngon-ngu-va-giao-tiep",
        title: "Ngôn ngữ và giao tiếp"
      },
      {
        path: "/phuc-hoi-chuc-nang/than-kinh",
        title: "Thần kinh"
      }
    ]
  },
  {
    path: "/lien-he",
    title: "Liên hệ"
  }
];
