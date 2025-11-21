'use client'
import { PortfolioStore } from "@/app/segment/portfolio/store";
import { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { faArrowLeft, faArrowRight, faClose, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectVal } from "@/app/segment/portfolio/values";
import NestedCarousel from "@/app/segment/portfolio/component/NestedCarousel";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import slidesData from '@/app/segment/portfolio/values/project_values.json';
import LoadingWrapper from "@/app/segment/portfolio/component/LoadingWrapper"
import { ProjectType } from "@/app/segment/portfolio/type";
import cn from 'clsx';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
export default function ProjectDialog() {
    const { project_dialog, set_project_dialog, selected_project, set_selected_project, set_selected_project_index, selected_project_index, is_loading, set_multiple_links, set_multiple_link_dialog } = PortfolioStore();
    const projects: ProjectType[] = slidesData;
    // clear the state on unmount
    useEffect(() => {
        if (!project_dialog) {
            return (set_selected_project(ProjectVal))
        }
    }, [project_dialog])

    useEffect(() => {
        return (console.log(selected_project.images_path));
    }, [selected_project])


    const header = () => {
        return (
            <div className="bg-black w-full  sm:h-[5%] text-white flex flex-col justify-center p-2 sm:p-2 items-start ">
                <div className="flex justify-between  w-full p-2">
                    <div className="cursor-pointer" onClick={() => { set_project_dialog(false) }}>
                        <FontAwesomeIcon icon={faClose} size="xl" />
                        {/* Close */}
                    </div>
                    {guide()}
                </div>
            </div>
        )
    }

    const guide = () => {
        return (
            <div className="flex gap-2">
                <LoadingWrapper>
                    <FontAwesomeIcon icon={faArrowLeft} className="cursor-pointer" size="xl" onClick={() => {
                        if (selected_project_index > 0 && projects[selected_project_index - 1].name !== '') {
                            set_selected_project_index(selected_project_index - 1)
                        }
                    }} />
                    <div className="w-36 text-center">{selected_project.name}</div>
                    <FontAwesomeIcon icon={faArrowRight} className="cursor-pointer" size="xl" onClick={() => {
                        if (selected_project_index < projects.length - 1 && projects[selected_project_index + 1].name !== '') {
                            set_selected_project_index(selected_project_index + 1)
                        }
                    }} />
                </LoadingWrapper>
            </div>
        )
    }

    const projectDescription = () => {
        return (
            <>

                <div className='flex flex-row  flex-wrap gap-1 items-center text-sm' >
                    <div>Technology Used:&nbsp;</div>
                    <LoadingWrapper>
                        {selected_project && selected_project.technology && selected_project.technology.map((item: string, index: number) => (
                            <Badge key={index}  >{item}</Badge>
                        ))}
                    </LoadingWrapper>
                </div>

                <div className='flex flex-row gap-1 items-center text-sm'>
                    <div>Project Type:&nbsp;</div>
                    <LoadingWrapper>
                        <Badge>{selected_project.type}</Badge>
                    </LoadingWrapper>
                </div>

                <div className='flex flex-row gap-1 items-center text-sm'>
                    <div>Platform:&nbsp;</div>
                    <LoadingWrapper>
                        {selected_project && selected_project.platform && selected_project.platform.map((item: string, index: number) => (
                            <Badge key={index} >{item}</Badge>
                        ))}
                    </LoadingWrapper>
                </div>

                <div className='flex flex-row flex-wrap gap-1 items-center text-sm' >
                    <div>Status:&nbsp;</div>
                    <LoadingWrapper>
                        {selected_project && selected_project.status && selected_project.status.map((item: string, index: number) => (
                            <Badge key={index}>{item}</Badge>
                        ))}
                    </LoadingWrapper>
                </div>


                <div className='flex flex-row gap-1 items-center text-sm'>
                    <div>Role:&nbsp;</div>
                    <LoadingWrapper>
                        {selected_project && selected_project.role && selected_project.role.map((item: string, index: number) => (
                            <Badge key={index}>{item}</Badge>
                        ))}
                    </LoadingWrapper>
                </div>


                <div className='flex flex-col text-sm'>
                    <LoadingWrapper>
                        <div className='pr-6'>{selected_project.long_description}</div>
                    </LoadingWrapper>
                </div>


                <LoadingWrapper>
                    {selected_project && selected_project.higlights && (
                        <>
                            <div className='flex flex-col flex-wrap gap-1  text-sm'>
                                {selected_project.higlights.map((item: string, index: number) => (
                                    <p key={index}>• {item}.</p>
                                ))}
                            </div>
                        </>
                    )}
                </LoadingWrapper>

                <LoadingWrapper>
                    {selected_project && selected_project.demo_accounts && (
                        <>
                            <div className='flex flex-col  text-xs'>
                                <div>Demo Accounts:&nbsp;</div>
                                <Accordion type="single" collapsible >
                                    {selected_project.demo_accounts.map((item: { role: string; username: string; password: string }, index: number) => (
                                        <AccordionItem key={`role${item.role}${index}`} value={`role${item.role}${index}`}>
                                            <AccordionTrigger>{item.role}</AccordionTrigger>
                                            <AccordionContent className="pl-20">
                                                <Accordion type="single" collapsible className="">
                                                    <AccordionContent>Username: {item.username}</AccordionContent>
                                                    <AccordionContent>Password: {item.password}  </AccordionContent>
                                                </Accordion>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </>
                    )}
                </LoadingWrapper>

                <div className='grow'></div>
                <div className='flex flex-row justify-between dark:text-white  items-center h-16  '>
                    <LoadingWrapper>
                        <p className='lg:ml-2'>{(1 + selected_project_index)}/{slidesData.length}</p>
                        <div className='flex flex-row gap-4 pr-3'>
                            {selected_project.source_code && selected_project.source_code.length > 0 && (
                                <div className='flex flex-col enlarge_litle' onClick={() => { set_multiple_links(selected_project.source_code); set_multiple_link_dialog(true); }} >
                                    <FontAwesomeIcon icon={faGithub} className=" grow " size="xl" />
                                    <p className='text-blue-500'>Source Code</p>
                                </div>

                            )}
                            {selected_project && selected_project.project_link && (
                                <a href={selected_project.project_link} target="_blank" rel="noopener noreferrer" className=" grow enlarge_litle flex flex-col">
                                    <FontAwesomeIcon icon={faLink} size="xl" />
                                    <p className='text-blue-500'>Visit</p>
                                </a>
                            )}
                        </div>
                    </LoadingWrapper>
                </div>

            </>
        )
    }

    return (
        <Dialog open={project_dialog} onOpenChange={set_project_dialog}>
            <DialogContent hideCloseButton={true} fullscreen={true} className={cn("overflow-y-auto sm:overflow-y-hidden min-w-full max-h-[calc(100dvh)] min-h-[calc(100dvh)]  sm:h-screen w-screen bg-gray-100 sm:rounded-md flex flex-col dark:bg-[#18191a]", { 'h-screen': is_loading })}>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                {header()}

                <div className={cn('flex flex-col sm:flex-row w-full sm:h-full p-2', { 'h-full': is_loading })}>

                    <div className={cn("bg-gray-200 min-h-[27%] w-full  sm:w-[65%] sm:h-full flex flex-col justify-center sm:pb-36 dark:bg-[#242526] sm:rounded-2xl")}>
                        <NestedCarousel />
                    </div>

                    <div className={cn("bg-white w-full min-h-full sm:w-[35%] sm:overflow-y-auto   sm:h-full p-4 flex flex-col gap-2  dark:text-white dark:bg-[#31363F] sm:rounded-2xl  sm:over")}>
                        {projectDescription()}
                    </div>


                </div>

            </DialogContent>
        </Dialog>
    );
}