import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimeline } from "@fortawesome/free-solid-svg-icons";
import Timeline from "@/app/segment/experience/component/timeline";
import events from '@/app/segment/experience/value.json';

function getTotalExperience() {
  const startDate = new Date("2023-04-24");
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months };
}

export default function Experience() {
  const { years, months } = getTotalExperience();

  return (
    <div className="container sm:pb-28 pt-8" id="experience">
      <div
        className="flex flex-col md:flex-row items-center justify-center 
                   text-4xl md:text-5xl dark:text-white gap-2 md:gap-5"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800"
      >
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={faTimeline} />
          <span>Experience</span>
        </div>

        {/* Experience years */}
        <p className="text-2xl md:text-3xl font-semibold 
                      bg-gradient-to-r from-blue-500 to-purple-500 
                      bg-clip-text text-transparent">
          {years} yrs {months} mos
        </p>
      </div>

      <Timeline events={events} />
    </div>
  );
}
