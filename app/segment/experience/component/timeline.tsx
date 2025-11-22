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
    <div className="relative mx-auto pt-8 pb-36 overflow-x-hidden">
      {/* Gradient Timeline Line */}
      <div className="absolute left-5 md:left-1/2 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>

      {/* Timeline Events */}
      <div className="space-y-12 md:space-y-16">
        {events.map((event: any, index: number) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-start md:justify-between md:space-x-6 relative"
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-delay={200 + index * 100}
            data-aos-duration="600"
          >
            {/* Timeline Dot with Icon */}
            <div className="absolute -left-3 md:left-1/2 top-0 transform md:-translate-x-1/2 mt-4 md:mt-16 z-10">
              <div className="relative flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faCircle}
                  className="text-blue-500 dark:text-purple-400 text-xl animate-pulse"
                />
                <span className="absolute text-white text-xs md:text-sm">{event.icon}</span>
              </div>
            </div>

            {/* Event Card */}
            <div className="md:w-1/2 w-full md:pl-0 md:pr-0 mb-4 md:mb-0 rounded-xl">
              <Card className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 ease-in-out w-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
                <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{event.date}</p>
                {Array.isArray(event.description) ? (
                  <ul className="list-disc pl-4 mt-2 text-sm space-y-1">
                    {event.description.map((bullet: string, idx: number) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-gray-700 dark:text-gray-200">{event.description}</p>
                )}
              </Card>
            </div>

            {/* Image */}
            <div className="md:w-1/2 w-full flex justify-center items-center">
              {event.image && (
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={250}
                  className="rounded-xl shadow-lg object-cover w-full max-w-md"
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
