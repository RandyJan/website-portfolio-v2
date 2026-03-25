import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faToolbox } from "@fortawesome/free-solid-svg-icons"
import { Card, CardContent } from "@/components/ui/card"

import { SectionIntro } from "@/components/section-intro"

import skillsData from "@/app/segment/skills/value.json"

export default function Skills() {
  return (
    <section id="skills" className="section-shell pt-6">
      <div className="section-card px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
        <SectionIntro
          eyebrow="Toolset"
          title="Flexible across frontend, backend, mobile, and delivery tools."
          description="My stack is shaped by real project needs, with a strong bias toward maintainability, performance, and fast collaboration."
          aside={
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-200/70 bg-sky-50/80 px-4 py-3 text-sm font-semibold text-sky-800 dark:border-sky-400/20 dark:bg-slate-900/70 dark:text-sky-300">
              <FontAwesomeIcon icon={faToolbox} />
              {Object.values(skillsData.skills).flat().length} technologies
            </div>
          }
        />

        <div className="section-grid mt-10 grid-cols-1 xl:grid-cols-2">
          {Object.entries(skillsData.skills).map(([category, skills], index) => (
            <Card
              key={category}
              className="rounded-[1.75rem] border border-slate-200/80 bg-white/80 shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition duration-500 hover:-translate-y-1.5 hover:border-sky-300 dark:border-white/10 dark:bg-slate-950/65 dark:hover:border-sky-400/20"
              data-aos="fade-up"
              data-aos-delay={140 + index * 70}
            >
              <CardContent className="p-6 sm:p-8">
                <div className="mb-8 flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold capitalize tracking-tight text-slate-950 dark:text-white">
                    {category}
                  </h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                    {skills.length}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex flex-col items-center gap-3 rounded-[1.5rem] border border-slate-200/60 bg-white/85 px-4 py-5 text-center transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-md dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-sky-400/20 dark:hover:bg-slate-900"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-800 dark:ring-white/10">
                        <img
                          src={skill.image}
                          alt={skill.name}
                          className="max-h-10 w-auto object-contain transition duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span className="text-sm font-medium leading-6 text-slate-600 dark:text-slate-300">
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
    </section>
  )
}
