import { Card } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBriefcase, faGraduationCap, faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Timeline = ({ events }: any) => {
  const getIcon = (eventType: string) => {
    switch (eventType) {
      case "work":
        return faBriefcase;
      case "education":
        return faGraduationCap;
      default:
        return faStar;
    }
  };

return (
  <div className="relative mx-auto pt-12 pb-40 overflow-x-hidden w-full">
    {/* Soft Ambient Glow */}
    {/* <div className="absolute inset-0 pointer-events-none opacity-30 blur-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 "></div> */}

    {/* Gradient Timeline Line */}
    <div className="absolute left-6 md:left-1/2 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full shadow-[0_0_18px_rgba(99,102,241,0.6)] "></div>

    {/* Timeline Events */}
    <div className="space-y-20 md:space-y-28 ">
      {events.map((event: any, index: number) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center justify-between md:space-x-10 relative"
          data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          data-aos-delay={150 + index * 120}
          data-aos-duration="700"
        >
          {/* Timeline Icon Node */}
<div className="absolute left-0 md:left-[50%] top-14 transform md:-translate-x-1/2 z-20">
            <div className="relative flex items-center justify-center w-11 h-11 md:w-14 md:h-14 
                rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/40">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-white opacity-20 absolute text-3xl"
              />
              <span className="absolute text-white font-semibold text-xs md:text-sm">
                {event.icon}
              </span>
            </div>
          </div>

          {/* Event Card */}
          <div className="md:w-1/2 w-full mt-20 md:mt-0">
            <Card className="p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 
                    bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700
                    hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
              <h3 className="text-2xl font-bold mb-1 tracking-tight">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {event.date}
              </p>

              {Array.isArray(event.description) ? (
                <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  {event.description.map((bullet: string, idx: number) => (
                    <li key={idx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {event.description}
                </p>
              )}
            </Card>
          </div>

          {/* Image */}
          <div className="md:w-1/2 w-full flex justify-center md:justify-end mt-6 md:mt-0 pr-0 md:pr-10">
            {event.image && (
              <Image
                src={event.image}
                alt={event.title}
                width={420}
                height={260}
                className="rounded-2xl shadow-xl object-cover w-full max-w-md 
                        hover:scale-[1.02] transition duration-500"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

};

export default Timeline;
