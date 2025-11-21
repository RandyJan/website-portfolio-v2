import { Card } from "@/components/ui/card"
const Timeline = ({ events }: any) => {
    return (
        <div className="relative  mx-auto pt-8 pb-36 overflow-x-hidden">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 w-1 bg-gray-300 h-full transform -translate-x-1/2 md:block hidden"></div>

            {/* Timeline events */}
            <div className="space-y-8">
                {events.map((event: any, index: number) => (
                    <div key={index} className="flex items-center justify-between md:flex md:justify-between md:items-center md:space-x-4">
                        {index % 2 === 0 ? (
                            // Left side event
                            <>
                                <div className="md:w-1/2 w-full md:pl-0 rounded-xl"
                                    data-aos="fade-right"
                                    data-aos-delay="800"
                                    data-aos-duration="500">
                                    <Card className="text-gray-700  dark:text-white p-6 border border-gray-200 rounded-xl shadow-lg bg-white dark:bg-[#31363F] hover:shadow-xl transition-shadow duration-300 ease-in-out w-full">
                                        <h3 className="text-2xl font-semibold ">{event.title}</h3>
                                        <p className=" text-sm">{event.date}</p>
                                        {Array.isArray(event.description) ? (
                                            <ul className="list-disc pl-4 text-sm ">
                                                {event.description.map((bullet: string, index: number) => (
                                                    <li key={index}>
                                                        <span >{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-700 mt-2">{event.description}</p>
                                        )}
                                    </Card>
                                </div>
                                <div className="md:w-1/2 w-0  md:justify-end md:pr-4 hidden md:block"></div>
                            </>
                        ) : (
                            // Right side event
                            <>
                                <div className="md:w-1/2 w-0  md:justify-start md:pl-4 hidden md:block"></div>
                                <div className="md:w-1/2 w-full md:pr-0 rounded-xl"
                                    data-aos="fade-left"
                                    data-aos-delay="800"
                                    data-aos-duration="500">
                                    <Card className="text-gray-700  dark:text-white p-6 border border-gray-200 rounded-xl shadow-lg  bg-white dark:bg-[#31363F] hover:shadow-xl transition-shadow duration-300 ease-in-out w-full">
                                        <h3 className="text-2xl font-semibold ">{event.title}</h3>
                                        <p className=" text-sm">{event.date}</p>
                                        {Array.isArray(event.description) ? (
                                            <ul className="list-disc pl-4 text-sm">
                                                {event.description.map((bullet: string, index: number) => (
                                                    <li key={index} >
                                                        <span >{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-700 mt-2">{event.description}</p>
                                        )}
                                    </Card>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
