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
import LoadingWrapper from "@/app/segment/portfolio/component/LoadingWrapper"
import { ProjectType } from "@/app/segment/portfolio/type";
import cn from 'clsx';
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useProjectsContent } from "@/lib/content-store";
export default function ProjectDialog() {
    const { project_dialog, set_project_dialog, selected_project, set_selected_project, set_selected_project_index, selected_project_index, is_loading, set_multiple_links, set_multiple_link_dialog } = PortfolioStore();
    const { data: projects } = useProjectsContent();
    // clear the state on unmount
    useEffect(() => {
        if (!project_dialog) {
            return (set_selected_project(ProjectVal))
        }
    }, [project_dialog, set_selected_project])


    const header = () => {
        return (
            <div className="w-full shrink-0 bg-black p-2 text-white">
                <div className="flex w-full items-center justify-between gap-3 p-2">
                    <div className="shrink-0 cursor-pointer" onClick={() => { set_project_dialog(false) }}>
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
            <div className="min-w-0">
                <LoadingWrapper>
                    <div className="flex min-w-0 items-center gap-3">
                        <FontAwesomeIcon icon={faArrowLeft} className="shrink-0 cursor-pointer" size="xl" onClick={() => {
                            if (selected_project_index > 0 && projects[selected_project_index - 1].name !== '') {
                                set_selected_project_index(selected_project_index - 1)
                            }
                        }} />
                        <div className="max-w-[52vw] truncate text-center text-sm font-medium sm:max-w-64 sm:text-base">{selected_project.name}</div>
                        <FontAwesomeIcon icon={faArrowRight} className="shrink-0 cursor-pointer" size="xl" onClick={() => {
                            if (selected_project_index < projects.length - 1 && projects[selected_project_index + 1].name !== '') {
                                set_selected_project_index(selected_project_index + 1)
                            }
                        }} />
                    </div>
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

                <div className='flex flex-row flex-wrap gap-1 items-center text-sm'>
                    <div className="shrink-0">Project Type:&nbsp;</div>
                    <LoadingWrapper>
                        <Badge>{selected_project.type}</Badge>
                    </LoadingWrapper>
                </div>

                <div className='flex flex-row flex-wrap gap-1 items-center text-sm'>
                    <div className="shrink-0">Platform:&nbsp;</div>
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


                <div className='flex flex-row flex-wrap gap-1 items-center text-sm'>
                    <div className="shrink-0">Role:&nbsp;</div>
                    <LoadingWrapper>
                        {selected_project && selected_project.role && selected_project.role.map((item: string, index: number) => (
                            <Badge key={index}>{item}</Badge>
                        ))}
                    </LoadingWrapper>
                </div>


                <div className='flex flex-col text-sm'>
                    <LoadingWrapper>
                        <div className='leading-7'>{selected_project.long_description}</div>
                    </LoadingWrapper>
                </div>


                <LoadingWrapper>
                    {selected_project && selected_project.higlights && (
                        <>
                            <div className='flex flex-col gap-2 text-sm leading-6'>
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
                <div className='flex min-h-16 flex-row items-center justify-between gap-4 pt-4 dark:text-white'>
                    <LoadingWrapper>
                        <p className='shrink-0 lg:ml-2'>{(1 + selected_project_index)}/{projects.length}</p>
                        <div className='flex flex-row flex-wrap justify-end gap-4'>
                            {selected_project.source_code && selected_project.source_code.length > 0 && (
                                <div className='flex flex-col items-center gap-1 enlarge_litle' onClick={() => { set_multiple_links(selected_project.source_code); set_multiple_link_dialog(true); }} >
                                    <FontAwesomeIcon icon={faGithub} size="xl" />
                                    <p className='text-blue-500'>Source Code</p>
                                </div>

                            )}
                            {selected_project && selected_project.project_link && (
                                <a href={selected_project.project_link} target="_blank" rel="noopener noreferrer" className="enlarge_litle flex flex-col items-center gap-1">
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
            <DialogContent hideCloseButton={true} fullscreen={true} className={cn("flex h-[100dvh] max-h-[100dvh] min-h-0 w-screen min-w-full flex-col overflow-hidden bg-gray-100 dark:bg-[#18191a] sm:rounded-md", { 'h-[100dvh]': is_loading })}>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                {header()}

                <div className={cn('flex min-h-0 w-full flex-1 flex-col gap-2 overflow-y-auto p-2 sm:flex-row sm:overflow-hidden', { 'h-full': is_loading })}>

                    <div className={cn("flex min-h-[16rem] w-full shrink-0 flex-col justify-center rounded-2xl bg-gray-200 dark:bg-[#242526] sm:min-h-0 sm:w-[65%] sm:flex-1")}>
                        <NestedCarousel />
                    </div>

                    <div className={cn("flex w-full min-h-0 flex-col gap-3 rounded-2xl bg-white p-4 dark:bg-[#31363F] dark:text-white sm:h-full sm:w-[35%] sm:overflow-y-auto")}>
                        {projectDescription()}
                    </div>


                </div>

            </DialogContent>
        </Dialog>
    );
}
