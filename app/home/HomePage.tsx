import dynamic from "next/dynamic";
import DefaultLayout from "../components/templates/DefaultLayout";

const SliderContainer = dynamic(() =>
  import("../components/organisms/SliderContainer").then((mod) => mod.default)
);

const Sesion1 = dynamic(() =>
  import("../components/organisms/Sesion1").then((mod) => mod.Sesion1)
);

const Sesion2 = dynamic(() =>
  import("../components/organisms/Sesion2").then((mod) => mod.Sesion2)
);

export default function HomePage() {
  return (
    <>
      <SliderContainer />
      <DefaultLayout>
        <Sesion1 />
        <Sesion2 />
      </DefaultLayout>
    </>
  );
}
