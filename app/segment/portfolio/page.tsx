"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode } from "@fortawesome/free-solid-svg-icons"

import { SectionIntro } from "@/components/section-intro"

import Carousel from "@/app/segment/portfolio/component/Carousel"
import ProjectDialog from "@/app/segment/portfolio/component/ProjectDialog"
import SrcDialog from "@/app/segment/portfolio/component/SrcDialog"
import { useProjectsContent } from "@/lib/content-store"

export default function Porfolio() {
  const { data: projects } = useProjectsContent()

  return (
    <section id="portfolio" className="section-shell pt-6">
      <div className="section-card px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
        <SectionIntro
          eyebrow="Selected work"
          title="Projects that reflect how I build."
          description="A mix of web, mobile, and systems work focused on useful business outcomes, maintainable code, and smoother user flows."
          aside={
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-200/70 bg-sky-50/80 px-4 py-3 text-sm font-semibold text-sky-800 dark:border-sky-400/20 dark:bg-slate-900/70 dark:text-sky-300">
              <FontAwesomeIcon icon={faCode} />
              {projects.length} featured projects
            </div>
          }
        />

        <div className="mt-10">
          <Carousel />
          <SrcDialog />
          <ProjectDialog />
        </div>
      </div>
    </section>
  )
}
