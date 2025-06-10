import dynamic from "next/dynamic";

const LayoutYHoc = dynamic(() =>
  import("../../components/templates/LayoutYHoc").then((mod) => mod.LayoutYHoc)
);


export default function Page() {
  return <LayoutYHoc path="van-dong" />;
}
