import { getSeoData } from "@/src/utils/getSeoData";
import { generateMetadataFromFullHead } from "@/src/utils/seoUtils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { GET_LIEN_HE } from "../api/Graphql/lienHe";
import LayoutDefault from "../components/templates/LayoutDefault";

const Contact = dynamic(() =>
  import("@/src/app/components/molecules/Contact").then((mod) => mod.Contact)
);

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSeoData(GET_LIEN_HE, "pageBy");

  return {
    ...generateMetadataFromFullHead(
      seo.fullHead || "",
      seo.focusKeywords || ""
    ),
    robots: "index, follow",
  };
}
export default function LienHe() {
  return (
    <LayoutDefault>
      <Contact />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.7609480745314!2d105.77113527669943!3d21.04224898731216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454c918a64e17%3A0x6a26c7ecd7ef4df2!2zMTE2IFAuIFRy4bqnbiBW4bu5LCBNYWkgROG7i2NoLCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1695417775713!5m2!1sen!2s"
        width="100%"
        height="500"
        style={{ border: "none" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </LayoutDefault>
  );
}
