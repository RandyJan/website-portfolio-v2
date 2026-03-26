"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCodeBranch,
  faFeatherPointed,
  faGaugeHigh,
  faShieldHeart,
} from "@fortawesome/free-solid-svg-icons"

import { SectionIntro } from "@/components/section-intro"

const philosophyItems = [
  {
    title: "Readable before clever",
    description:
      "I aim for code that teammates can understand quickly, extend safely, and revisit without needing to decode hidden intent.",
    icon: faFeatherPointed,
  },
  {
    title: "Ship with maintainability in mind",
    description:
      "Fast delivery matters, but I try to keep structure, naming, and boundaries strong enough that the next feature does not become harder to build.",
    icon: faCodeBranch,
  },
  {
    title: "Performance where it counts",
    description:
      "I care about responsiveness, lean interfaces, and practical optimization, especially when it directly improves the user experience.",
    icon: faGaugeHigh,
  },
  {
    title: "Build for people, not just tickets",
    description:
      "Behind every task is a user, teammate, or stakeholder. Good code should reduce friction for all of them, not only satisfy requirements on paper.",
    icon: faShieldHeart,
  },
]

export default function CodePhilosophy() {
  return (
    <section id="code-philosophy" className="section-shell pt-6">
      <div className="section-card overflow-hidden px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
        <SectionIntro
          eyebrow="Code Philosophy"
          title="The standards I try to bring into every build."
          description="My approach to code is shaped by clarity, maintainability, user impact, and delivery discipline. I like systems that feel thoughtful under the hood, not just polished on the surface."
          aside={
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-4 py-3 text-sm font-semibold text-emerald-800 dark:border-emerald-400/20 dark:bg-slate-900/70 dark:text-emerald-300">
              <FontAwesomeIcon icon={faCodeBranch} />
              Principles behind the implementation
            </div>
          }
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {philosophyItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-950/60"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-emerald-600 via-sky-600 to-slate-950 p-6 text-white shadow-[0_24px_90px_rgba(15,23,42,0.16)] dark:border-white/10 sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_35%)]" />

            <div className="relative">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <FontAwesomeIcon icon={faShieldHeart} />
                What I optimize for
              </div>

              <h3 className="mt-6 text-3xl font-semibold tracking-tight">
                Code should stay clear under pressure.
              </h3>

              <p className="mt-4 text-sm leading-8 text-emerald-50/90">
                Whether I am building a feature from scratch, updating an existing system, or adapting to changing client requirements, I try to keep one thing consistent: the codebase should remain understandable, stable, and ready for what comes next.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-4 text-sm leading-7 text-slate-100 backdrop-blur-sm">
                  I value decisions that help teams move faster later, not just finish faster today.
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/20 px-5 py-4 text-sm leading-7 text-slate-100 backdrop-blur-sm">
                  Good architecture is useful because it lowers confusion, reduces rework, and makes collaboration feel lighter.
                </div>
                <div className="rounded-[1.5rem] border border-dashed border-white/20 bg-white/5 px-5 py-4 text-sm leading-7 text-slate-100/90">
                  That usually means simple abstractions, deliberate naming, careful UI behavior, and enough structure that future edits feel safe instead of fragile.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
