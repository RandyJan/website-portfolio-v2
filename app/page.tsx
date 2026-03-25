"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { GlobalStore } from "@/app/GlobalStore";

import Hero from "@/app/segment/Hero";
import CreativePlayground from "@/app/segment/CreativePlayground";
import Methodology from "@/app/segment/Methodology";
import AestheticInterlude from "@/app/segment/AestheticInterlude";
import Porfolio from "@/app/segment/portfolio/page";
import Experience from "@/app/segment/experience/page";
import Skills from "@/app/segment/skills/page";
import Footer from "@/app/segment/footer/page";
import Certifications from "./segment/certifications/page";

export default function IndexPage() {
  const { theme } = useTheme();
  const { set_is_dark } = GlobalStore();

  useEffect(() => {
    set_is_dark(theme === "dark");
  }, [set_is_dark, theme]);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="w-full">
      <Hero />
      <CreativePlayground />
      <Porfolio />
      <Experience />
      <Methodology />
      <AestheticInterlude />
      <Skills />
      <Certifications />
      <Footer />
    </div>
  );
}
