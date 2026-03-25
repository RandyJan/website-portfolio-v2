"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimeline } from "@fortawesome/free-solid-svg-icons"

import { SectionIntro } from "@/components/section-intro"

import Timeline from "@/app/segment/experience/component/timeline"
import { useExperienceContent } from "@/lib/content-store"

function getTotalExperience() {
  const startDate = new Date("2023-04-24")
  const now = new Date()

  let years = now.getFullYear() - startDate.getFullYear()
  let months = now.getMonth() - startDate.getMonth()
  const days = now.getDate() - startDate.getDate()

  if (days < 0) {
    months -= 1
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  return { years, months }
}

export default function Experience() {
  const { years, months } = getTotalExperience()
  const { data: events } = useExperienceContent()

  return (
    <section id="experience" className="section-shell pt-6">
      <div className="section-card px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
        <SectionIntro
          eyebrow="Professional path"
          title="Experience shaped by delivery, collaboration, and growth."
          description="From shipping internal systems to building APIs and production interfaces, each role added depth in architecture, teamwork, and product thinking."
          aside={
            <div className="inline-flex items-center gap-3 rounded-full border border-orange-200/70 bg-orange-50/80 px-4 py-3 text-sm font-semibold text-orange-800 dark:border-orange-400/20 dark:bg-slate-900/70 dark:text-orange-300">
              <FontAwesomeIcon icon={faTimeline} />
              {years} yrs {months} mos experience
            </div>
          }
        />

        <Timeline events={events} />
      </div>
    </section>
  )
}
