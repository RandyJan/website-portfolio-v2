import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import Carousel from "@/app/segment/portfolio/component/Carousel";
import SrcDialog from "@/app/segment/portfolio/component/SrcDialog";
import ProjectDialog from "@/app/segment/portfolio/component/ProjectDialog";
import ProjectValues from "./values/project_values.json";

export default function Porfolio() {
  return (
    <div className="h-[100%] w-full flex flex-col justify-center pb-28" id="portfolio">
      <div className="sm:bg-gray-100 sm:dark:bg-background md:p-6 overflow-hidden">
        <div className="sm:container">

          {/* Responsive Header */}
          <div
            className="flex flex-col md:flex-row items-center justify-center 
                       text-4xl md:text-5xl dark:text-white gap-3 md:gap-5"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="800"
          >
            <div className="flex flex-row items-center gap-3">
              <FontAwesomeIcon icon={faCode} />
              <p>Portfolio</p>
            </div>

            <p
              className="text-2xl md:text-3xl font-semibold 
                         bg-gradient-to-r from-blue-500 to-purple-500 
                         bg-clip-text text-transparent"
            >
              {ProjectValues.length} Projects
            </p>
          </div>

          <Carousel />
          <SrcDialog />
          <ProjectDialog />
        </div>
      </div>
    </div>
  );
}
