import Head from "next/head";
import styles from "./styles/Home.module.css";
import HeroBanner from "@components/HeroBanner.js";
import ReqConsultation from "./sections/ReqConsultation";
import CustomCarousel from "@components/CustomCarousel";
import Counter from "@components/Counter";
import Services from "./sections/Services";
import OurWork from "./sections/OurWork";
import Testimonial from "./sections/Testimonial";
import WhoWe from "./sections/WhoWe";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sciverse </title>
        <meta
          name="Sciverse"
          content="A Software company for all tech solution "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroBanner />
      <WhoWe />
      <Services /> 
      <OurWork />
      <CustomCarousel />
      <Counter />
      <Testimonial />
      <div className=" text-center w-full flex justify-center my-[50px]">
        <img
          src="/images/SciverseLogoBlack.png"
          alt="Sciverse "
          className="BottomLogo"
        />
      </div>
      <ReqConsultation />
    </>
  );
}
