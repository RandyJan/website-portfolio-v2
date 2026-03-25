"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"

const orbs = [
  { id: "sky", size: "size-24", className: "from-sky-400/55 to-cyan-300/10", x: "12%", y: "18%" },
  { id: "orange", size: "size-20", className: "from-orange-300/50 to-amber-200/10", x: "74%", y: "22%" },
  { id: "mint", size: "h-16 w-32", className: "from-emerald-300/35 to-cyan-300/10", x: "46%", y: "58%" },
  { id: "violet", size: "size-28", className: "from-slate-200/20 to-sky-300/10", x: "78%", y: "68%" },
]

export default function AestheticInterlude() {
  const [pointer, setPointer] = useState({ x: 50, y: 50 })

  const glowStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(56,189,248,0.22), transparent 16%), radial-gradient(circle at ${100 - pointer.x}% ${100 - pointer.y}%, rgba(251,146,60,0.16), transparent 22%)`,
    }),
    [pointer]
  )

  return (
    <section className="section-shell">
      <div
        className="section-card relative overflow-hidden px-4 py-4 sm:px-5 sm:py-5"
        onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          const x = ((event.clientX - bounds.left) / bounds.width) * 100
          const y = ((event.clientY - bounds.top) / bounds.height) * 100
          setPointer({ x, y })
        }}
      >
        <div className="relative h-44 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.8),rgba(240,249,255,0.72),rgba(255,247,237,0.72))] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(2,6,23,0.96),rgba(15,23,42,0.94),rgba(30,41,59,0.9))]">
          <div className="pointer-events-none absolute inset-0 opacity-90" style={glowStyle} />
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-sky-300/20" />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent dark:via-orange-300/20" />

          {orbs.map((orb, index) => (
            <motion.div
              key={orb.id}
              className={`absolute ${orb.size} rounded-full border border-white/20 bg-gradient-to-br ${orb.className} backdrop-blur-md dark:border-white/10`}
              style={{
                left: orb.x,
                top: orb.y,
                transform: `translate(${(pointer.x - 50) * (0.06 + index * 0.01)}px, ${(pointer.y - 50) * (0.04 + index * 0.01)}px)`,
              }}
              animate={{
                y: [0, index % 2 === 0 ? -12 : 10, 0],
                rotate: [0, index % 2 === 0 ? 8 : -6, 0],
              }}
              transition={{
                duration: 7 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.div
            className="absolute left-[18%] top-[34%] h-14 w-[48%] rounded-full border border-white/20 bg-white/10 blur-[1px] dark:border-white/10 dark:bg-sky-200/5"
            animate={{ x: [0, 26, 0], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[18%] left-[28%] h-10 w-[34%] rounded-full border border-white/15 bg-white/10 blur-[1px] dark:border-white/10 dark:bg-orange-200/5"
            animate={{ x: [0, -18, 0], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  )
}
