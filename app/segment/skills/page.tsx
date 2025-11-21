import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent } from "@/components/ui/card";
import skillsData from "@/app/segment/skills/value.json";

export default function Skills() {
  return (
    <div className="lg:h-[90%] container pb-10" id="skills">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:pt-8 sm:w-[100%] sm:m-auto">
        {Object.entries(skillsData.skills).map(([category, skills], index) => (
          <Card
            key={category}
            className="h-[100%] pb-3 sm:p-0 dark:bg-[#31363F] rounded-xl"
            data-aos="fade-down"
            data-aos-delay={500 + index * 100}
            data-aos-duration="600"
          >
            <CardContent>
              <h2 className="text-xl sm:text-2xl text-center capitalize py-4">
                {category}
              </h2>

              <div className="grid grid-cols-4 gap-x-6 sm:gap-x-3 gap-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="flex flex-col enlarge">
                    <div className="flex flex-col items-center border-none shadow-none">
                      <img
                        src={skill.image}
                        alt={skill.name}
                        className="min-h-[2.7rem] sm:h-14 mx-auto rounded-sm bg-cover"
                      />
                    </div>
                    <span className="text-[0.65rem] sm:text-xs font-semibold text-center max-w-20">
                      {skill.name}
                    </span>
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
