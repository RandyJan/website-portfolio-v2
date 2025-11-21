"use client";
import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faLink } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import slidesData from '@/app/segment/portfolio/values/project_values.json';
import { Keyboard, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Badge } from "@/components/ui/badge"
import { GlobalStore } from '@/app/GlobalStore'
import { PortfolioStore } from '@/app/segment/portfolio/store'
import { DynamicSystemLogo } from "@/app/segment/portfolio/component/DynamicSystemLogo";
import { ProjectType } from "@/app/segment/portfolio/type";
export default function Carousel() {

  const { is_dark } = GlobalStore();
  const { set_selected_project, set_multiple_links, set_multiple_link_dialog, set_project_dialog, set_selected_project_index } = PortfolioStore();
  const projects: ProjectType[] = slidesData;
  const [systemLogo, setSystemLogo] = useState(DynamicSystemLogo("#000000"));

  return (
    <Swiper
      data-aos="fade-left"
      data-aos-delay="500"
      data-aos-duration="600"
      className='swiper1 '
      slidesPerView={3}
      spaceBetween={30}
      // centeredSlides={true}
      // centeredSlidesBounds={true}
      modules={[Keyboard, Navigation, Pagination]}
      navigation
      pagination={{
        dynamicBullets: true,
        clickable: true
      }}
      breakpoints={{
        200: {
          slidesPerView: 1,
        },
        600: { slidesPerView: 2 },
        768: { slidesPerView: 3 }
      }}
      keyboard={{
        enabled: true,
      }}
      initialSlide={0}
    >

      {projects.map((project, index) => (
        <SwiperSlide key={project.name} style={{ height: '30rem', display: 'flex', alignItems: 'center', padding: '1rem' }} >
          <Card className='rounded-xl w-full dark:bg-[#31363F]'>
            <CardContent >
              <div className="flex flex-col justify-start bg-white w-full h-96 p-6  m-center  dark:bg-[#31363F]">
                <Badge className="mb-2 self-end  dark:text-black">
                  {project.type}
                </Badge>
                <div className="grow flex flex-col items-center text-center  dark:text-white">
                  <img src={systemLogo} alt='app' />

                  <p className=' text-2xl font-semibold  dark:text-white'>{project.name}</p>
                  <p className=' text-xl text-gray-400  dark:text-white'>{project.description}</p>
                </div>
                <div className="self-center flex flex-row gap-3 items-center">
                  {!Array.isArray(project.source_code) && project.source_code ? (
                    <a href={project.source_code} target="_blank" className="text-blue-500 grow enlarge" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faGithub} size="2xl" />
                    </a>

                  ) : project.source_code.length > 0 && (
                    <>
                      <FontAwesomeIcon icon={faGithub} size="2xl" className="text-blue-500 grow enlarge" onClick={() => { set_multiple_links(project.source_code); set_multiple_link_dialog(true); }} />
                    </>
                  )}
                  <FontAwesomeIcon onClick={() => { set_selected_project(project); set_project_dialog(true); set_selected_project_index(index) }} className='enlarge pl-2 pr-2 ' style={{ color: is_dark ? '#ffffff' : '#000000', border: is_dark ? '1px solid #ffffff' : '1px solid #000000', borderRadius: '12%' }} icon={faEllipsis} size="2xl" />
                  {project.project_link && (
                    <a href={project.project_link} target="_blank" className="text-blue-500 grow enlarge" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faLink} size="2xl" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
