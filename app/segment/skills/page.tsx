import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import skillsData from "@/app/segment/skills/value.json";

export default function Skills() {
  return (
    <div className="lg:h-[90%] container pb-10" id="skills">
      {/* Header */}
      <div
        className="flex flex-col md:flex-row items-center justify-center
                   text-4xl md:text-5xl dark:text-white gap-3 md:gap-5 p-10"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800"
      >
        <div className="flex flex-row items-center gap-3">
          <FontAwesomeIcon icon={faToolbox} />
          <p>Skills</p>
        </div>

        <span
          className="text-2xl md:text-3xl font-semibold
                     bg-gradient-to-r from-blue-500 to-purple-500
                     bg-clip-text text-transparent"
        >
          Flexible
        </span>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:pt-8 sm:w-[100%] sm:m-auto">
        {Object.entries(skillsData.skills).map(([category, skills], index) => (
          <Card
            key={category}
            className="h-[100%] pb-3 sm:p-0 dark:bg-[#31363F] rounded-xl
                       border border-transparent hover:border-blue-500/30
                       bg-gradient-to-br from-gray-800/40 to-gray-900/40
                       hover:from-blue-700/30 hover:to-purple-700/30
                       transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 hover:scale-105
                       shadow-md hover:shadow-xl"
            data-aos="fade-down"
            data-aos-delay={500 + index * 100}
            data-aos-duration="600"
          >
            <CardContent>
              {/* Category Title */}
              <h2 className="text-2xl font-bold mb-6 text-center dark:text-whitetext-xl sm:text-2xl text-center capitalize py-4">
                {category}
              </h2>

              {/* Skills Icons */}
              <div className="grid grid-cols-4 gap-x-6 sm:gap-x-3 gap-y-6">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center group relative"
                  >
                    <div className="relative flex items-center justify-center
                                    transition-transform duration-300
                                    group-hover:scale-110 group-hover:rotate-3">
                      <img
                        src={skill.image}
                        alt={skill.name}
                        className="min-h-[2.7rem] sm:h-14 mx-auto rounded-xl bg-cover shadow-sm hover:shadow-lg"
                      />
                      {/* Tooltip */}
                      <span className="absolute bottom-full mb-2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
