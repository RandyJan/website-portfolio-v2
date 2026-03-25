"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowsRotate,
  faClipboardList,
  faComments,
  faDiagramProject,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons"

import { SectionIntro } from "@/components/section-intro"

const methodologyItems = [
  {
    id: "agile",
    label: "Agile flow",
    icon: faArrowsRotate,
    title: "Working in Agile delivery cycles",
    summary:
      "Used to sprint-based execution, iterative delivery, and building in small, reviewable increments.",
    points: [
      "Comfortable with planning, refinement, daily check-ins, and sprint reviews.",
      "Breaks features into practical slices so progress stays visible and testable.",
      "Balances speed with maintainability so short-term delivery does not create long-term friction.",
    ],
  },
  {
    id: "change",
    label: "Changing needs",
    icon: faPeopleArrows,
    title: "Adapting to shifting client requirements",
    summary:
      "Client priorities change, so my approach is to stay flexible without losing structure.",
    points: [
      "Reassesses scope quickly when new requests or constraints appear midstream.",
      "Adjusts implementation details while protecting the most important business outcomes.",
      "Communicates tradeoffs clearly so changes remain manageable instead of disruptive.",
    ],
  },
  {
    id: "docs",
    label: "Documentation",
    icon: faDiagramProject,
    title: "Documentation and system diagram creation",
    summary:
      "I document systems in a way that helps both development and handoff stay clear.",
    points: [
      "Experienced in outlining flows, structures, and interactions before or during implementation.",
      "Creates diagrams and supporting notes to make systems easier to explain and maintain.",
      "Uses documentation to support onboarding, review, and future enhancements.",
    ],
  },
  {
    id: "coordination",
    label: "Coordination",
    icon: faComments,
    title: "Seamless coordination with PMs and Product Owners",
    summary:
      "Strong delivery depends on alignment, not just code output.",
    points: [
      "Coordinates closely with project managers and product owners to keep priorities aligned.",
      "Clarifies requirements early to reduce back-and-forth during development.",
      "Translates technical constraints into practical updates stakeholders can act on.",
    ],
  },
]

export default function Methodology() {
  const [activeItem, setActiveItem] = useState(methodologyItems[0])

  return (
    <section className="section-shell pt-6">
      <div className="section-card px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
        <SectionIntro
          eyebrow="Methodology"
          title="How I work through delivery, change, and collaboration."
          description="Beyond tools and code, I bring a process mindset shaped by Agile execution, shifting client needs, system documentation, and close coordination with the people driving product decisions."
          aside={
            <div className="inline-flex items-center gap-3 rounded-full border border-orange-200/70 bg-orange-50/80 px-4 py-3 text-sm font-semibold text-orange-800 dark:border-orange-400/20 dark:bg-slate-900/70 dark:text-orange-300">
              <FontAwesomeIcon icon={faClipboardList} />
              Interactive workflow view
            </div>
          }
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-3">
            {methodologyItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveItem(item)}
                className={`rounded-[1.5rem] border p-5 text-left transition ${
                  activeItem.id === item.id
                    ? "border-sky-300 bg-sky-50 shadow-md dark:border-sky-400/30 dark:bg-sky-500/10"
                    : "border-slate-200/80 bg-white/80 hover:border-sky-200 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950/55 dark:hover:border-sky-400/20 dark:hover:bg-slate-900/70"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      activeItem.id === item.id
                        ? "bg-sky-500 text-white"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-[0_24px_90px_rgba(15,23,42,0.16)] dark:border-white/10 sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.24),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(251,146,60,0.18),_transparent_28%)]" />

            <div className="relative">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur-sm">
                <FontAwesomeIcon icon={activeItem.icon} />
                {activeItem.label}
              </div>

              <h3 className="mt-6 text-3xl font-semibold tracking-tight">
                {activeItem.title}
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300">
                {activeItem.summary}
              </p>

              <div className="mt-8 grid gap-4">
                {activeItem.points.map((point, index) => (
                  <div
                    key={`${activeItem.id}-${index}`}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/20 text-xs font-semibold text-sky-200">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-7 text-slate-200">{point}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 px-5 py-4 text-sm leading-7 text-slate-300">
                This workflow helps me stay dependable in real project environments where clarity, adaptability, and team alignment matter as much as implementation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
