import dynamic from "next/dynamic";
import SliderContainer from "../components/organisms/SliderContainer";
import LayoutDefault from "../components/templates/LayoutDefault";

const Sesion1 = dynamic(() =>
  import("../components/organisms/Sesion1").then((mod) => mod.Sesion1)
);

const Sesion2 = dynamic(() =>
  import("../components/organisms/Sesion2").then((mod) => mod.Sesion2)
);
const Sesion3 = dynamic(() =>
  import("../components/organisms/Sesion3").then((mod) => mod.default)
);

const Sesion4 = dynamic(() =>
  import("../components/organisms/Sesion4").then((mod) => mod.Sesion4)
);

export default function HomePage() {
  return (
    <>
      <SliderContainer />
      <LayoutDefault>
        <Sesion1 />
        <Sesion2 />
      </LayoutDefault>
      <Sesion3 />
      <LayoutDefault>
        <Sesion4 />
      </LayoutDefault>
    </>
  );
}
