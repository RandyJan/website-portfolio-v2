"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import {GlobalStore} from '@/app/GlobalStore'

import Hero from "@/app/segment/Hero";
import Porfolio from "@/app/segment/portfolio/page";
import Experience from "@/app/segment/experience/page";
import Skills from "@/app/segment/skills/page";
import Footer from "@/app/segment/footer/page";
import Certifications from "./segment/certifications/page";
// import { BgParticles } from "./tsparticles";
export default function IndexPage() {
  const { theme } = useTheme(); // Get the current theme from next-themes
  const {set_is_dark} = GlobalStore();
  const {is_dark} = GlobalStore();
  // Log theme changes to the console
  useEffect(() => {
    if(theme === "dark"){
      set_is_dark(true)
    }else{
      set_is_dark(false)
    }
    console.log(`Current theme: ${theme === "dark" ? "Dark mode" : "Light mode"}`);
  }, [theme]); // This will run whenever the theme changes

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return (
    <div className="h-full w-full">
      {/* <BgParticles key={is_dark.toString()}/> */}
      <Hero />
      <Porfolio />
      <Experience />
      <Skills />
      <Certifications/>
      <Footer/>
    </div>
  );
}
