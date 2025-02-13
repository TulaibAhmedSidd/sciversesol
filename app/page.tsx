import Head from "next/head";
import HeroBanner from "@components/HeroBanner.js";
import ReqConsultation from "./sections/ReqConsultation";
import CustomCarousel from "@components/CustomCarousel";
import Counter from "@components/Counter";
import CardContent from "@components/CardContent";
import Services from "./sections/Services";
import OurWork from "./sections/OurWork";
import Testimonial from "./sections/Testimonial";
import Team from "./sections/Team";
import WhoWe from "./sections/WhoWe";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sciverse Software Solution</title>
        <meta
          name="Sciverse Software Solution"
          content="A Software company for all tech solution "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroBanner />
      <WhoWe />
      <Services />
      {/* <OurWork /> */}
      <CustomCarousel />
      <Counter />
      <Testimonial />
      <Team />

      <div className=" text-center w-full flex justify-center my-[50px]">
        <img
          src="/images/biglogo.png"
          alt="Sciverse "
          className="bottom-logo w-auto h-auto max-w-full px-5"
        />
      </div>
      <ReqConsultation />
    </>
  );
}
