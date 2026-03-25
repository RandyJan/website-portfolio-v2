"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowPointer,
  faCube,
  faDroplet,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons"

import { SectionIntro } from "@/components/section-intro"

const floatingCards = [
  {
    title: "Motion",
    body: "Hover-driven transforms, layered depth, and responsive transitions.",
    icon: faCube,
    accent: "from-sky-500/30 to-cyan-300/20",
  },
  {
    title: "Atmosphere",
    body: "Soft gradients and light trails used to create mood without noise.",
    icon: faDroplet,
    accent: "from-orange-400/30 to-amber-200/20",
  },
  {
    title: "Micro Detail",
    body: "Small reactions that make interfaces feel more alive and intentional.",
    icon: faWandMagicSparkles,
    accent: "from-emerald-400/25 to-sky-300/20",
  },
]

export default function CreativePlayground() {
  const [pointer, setPointer] = useState({ x: 50, y: 50 })

  const spotlightStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(56, 189, 248, 0.24), transparent 20%), radial-gradient(circle at ${100 - pointer.x}% ${100 - pointer.y}%, rgba(251, 146, 60, 0.2), transparent 22%)`,
    }),
    [pointer]
  )

  return (
    <section className="section-shell pt-6">
      <div className="section-card overflow-hidden px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
        <SectionIntro
          eyebrow="Creative playground"
          title="A small interactive space for motion, layering, and visual play."
          description="Move your cursor across the canvas to shift the lighting, depth, and floating elements. It is a quick way to showcase animation taste and front-end creativity before the project section."
          aside={
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-200/70 bg-sky-50/80 px-4 py-3 text-sm font-semibold text-sky-800 dark:border-sky-400/20 dark:bg-slate-900/70 dark:text-sky-300">
              <FontAwesomeIcon icon={faArrowPointer} />
              Interactive visual demo
            </div>
          }
        />

        <div
          className="relative mt-10 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_24px_90px_rgba(15,23,42,0.2)] dark:border-white/10 sm:p-8"
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect()
            const x = ((event.clientX - bounds.left) / bounds.width) * 100
            const y = ((event.clientY - bounds.top) / bounds.height) * 100
            setPointer({ x, y })
          }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-90" style={spotlightStyle} />
          <div className="pointer-events-none absolute -left-16 top-12 size-40 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 size-52 rounded-full bg-orange-400/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="min-h-[24rem] rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
                    Live Interaction
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                    Motion Canvas
                  </h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">
                  Cursor reactive
                </div>
              </div>

              <div className="relative h-[18rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,41,59,0.9))]">
                <motion.div
                  className="absolute left-[10%] top-[14%] size-28 rounded-[2rem] border border-white/10 bg-gradient-to-br from-sky-400/40 to-sky-500/10 backdrop-blur-md"
                  animate={{
                    y: [0, -16, 0],
                    rotate: [0, 6, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    transform: `translate(${(pointer.x - 50) * 0.12}px, ${(pointer.y - 50) * 0.08}px)`,
                  }}
                />
                <motion.div
                  className="absolute right-[12%] top-[18%] h-24 w-24 rounded-full border border-white/10 bg-gradient-to-br from-orange-300/40 to-orange-500/10 backdrop-blur-md"
                  animate={{
                    y: [0, 18, 0],
                    x: [0, -10, 0],
                  }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    transform: `translate(${(50 - pointer.x) * 0.12}px, ${(pointer.y - 50) * 0.07}px)`,
                  }}
                />
                <motion.div
                  className="absolute bottom-[14%] left-[24%] h-20 w-44 rounded-full border border-white/10 bg-gradient-to-r from-emerald-300/30 to-cyan-300/10 backdrop-blur-md"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, -4, 0],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    transform: `translate(${(pointer.x - 50) * 0.08}px, ${(50 - pointer.y) * 0.1}px)`,
                  }}
                />

                <motion.div
                  className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/20"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.8, 0.45] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/15"
                  animate={{ scale: [1, 1.04, 1], opacity: [0.25, 0.5, 0.25] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="absolute bottom-4 left-4 right-4 rounded-[1.25rem] border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <p className="text-sm font-medium text-slate-100">
                    The lighting follows your cursor, while each layer moves at a different speed to create a subtle parallax feel.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {floatingCards.map((card, index) => {
                return (
                  <motion.div
                    key={card.title}
                    className={`rounded-[1.5rem] border border-white/10 bg-gradient-to-br ${card.accent} p-[1px]`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.12, duration: 0.5 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                  >
                    <div className="h-full rounded-[calc(1.5rem-1px)] bg-slate-950/80 p-5 backdrop-blur-md">
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                          <FontAwesomeIcon icon={card.icon} className="text-sky-300" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold tracking-tight text-white">
                            {card.title}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-slate-300">
                            {card.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
                  Design intent
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  This section is intentionally lightweight but expressive, showing how animation can add personality without overwhelming content or performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
