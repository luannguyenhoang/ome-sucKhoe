import dynamic from "next/dynamic";

const LayoutYHoc = dynamic(() =>
  import("@/src/app/components/templates/LayoutYHoc").then(
    (mod) => mod.LayoutYHoc
  )
);

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  return <LayoutYHoc path={slug} />;
}
