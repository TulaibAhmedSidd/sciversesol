import Head from "next/head";
import HeroBanner from "@components/HeroBanner.js";
import ReqConsultation from "./sections/ReqConsultation";
import CustomCarousel from "@components/CustomCarousel";
import Counter from "@components/Counter";
import CardContent from "@components/CardContent";
import Services from "./sections/Services";
import OurWork from "./sections/OurWork";
import Testimonial from "./sections/Testimonial";
import WhoWe from "./sections/WhoWe";
import { motion } from 'framer-motion';

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
      <OurWork />
      <CustomCarousel />
      <Counter />
      <Testimonial />
       {/* Team Section */}
       <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[{
            name: "Ovais Uddin", role: "Mobile App Developer", experience: "8+ years", desc: "Expert in Flutter, React Native, and mobile software solutions.", img: "https://randomuser.me/api/portraits/men/1.jpg"},
            { name: "Tulaib Ahmed", role: "Software Engineer", experience: "5+ years", desc: "Specializes in web applications using React, Next.js, Vue, and more.", img: "https://randomuser.me/api/portraits/men/2.jpg"},
            { name: "Ghulam Murtaza", role: "Game Developer", experience: "5+ years", desc: "Provides mobile and desktop game solutions.", img: "https://randomuser.me/api/portraits/men/3.jpg"},
            { name: "Abdul Wahaj Shera", role: "Senior Backend Developer", experience: "5+ years", desc: "Expert in backend and database services.", img: "https://randomuser.me/api/portraits/men/4.jpg"},
            { name: "Wasif Uddin", role: "Principal Designer", experience: "10+ years", desc: "Leads UI/UX design and all design services.", img: "https://randomuser.me/api/portraits/men/5.jpg"},
            { name: "Danyal Zia", role: "Product & Project Coordinator", experience: "8+ years", desc: "Manages client relations, product, and project coordination.", img: "https://randomuser.me/api/portraits/men/6.jpg"},
            { name: "Maaz Ahmed", role: "Principal Backend Developer & Client Relations", experience: "10+ years", desc: "Provides backend services and software solutions.", img: "https://randomuser.me/api/portraits/men/7.jpg"},
            { name: "Muhammad Mehmaam", role: "Senior Data Engineer, Analyst & Scientist", experience: "8+ years", desc: "Specializes in data analysis, data engineering, and predictive models.", img: "https://randomuser.me/api/portraits/men/8.jpg"}].map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white text-black rounded-2xl shadow-lg text-center"
            >
              <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <CardContent>
                <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                <p className="text-lg font-semibold">{member.role} ({member.experience})</p>
                <p>{member.desc}</p>
              </CardContent>
            </motion.div>
          ))}
        </div>
      </section>
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
