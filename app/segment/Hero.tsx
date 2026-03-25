"use client"

import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import {
  faArrowDown,
  faArrowRight,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons"

import { Button } from "@/components/ui/button"

const quickStats = [
  { label: "Years building", value: "3+" },
  { label: "Projects shipped", value: "15+" },
  { label: "Core focus", value: "Full stack" },
]

export default function Hero() {
  return (
    <section id="home" className="section-shell pt-10 sm:pt-14 lg:pt-20">
      <div className="section-card relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.24),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(251,146,60,0.18),_transparent_32%)]" />
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div className="relative z-10 space-y-8">
            <div className="section-kicker" data-aos="fade-right">
              Available for full-stack and frontend work
            </div>

            <div className="space-y-5">
              <p
                className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700 dark:text-sky-300"
                data-aos="fade-right"
                data-aos-delay="60"
              >
                Randy Jan P. Rongcales Jr.
              </p>
              <h1
                className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl dark:text-white"
                data-aos="fade-right"
                data-aos-delay="120"
              >
                Building practical products with clean code and clear UX.
              </h1>
              <p
                className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300"
                data-aos="fade-right"
                data-aos-delay="180"
              >
                Software developer focused on full-stack delivery, maintainable
                architecture, and interfaces that feel thoughtful from first
                click to final flow.
              </p>
            </div>

            <div
              className="flex flex-col gap-3 sm:flex-row"
              data-aos="fade-right"
              data-aos-delay="240"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-slate-950 px-7 text-white shadow-lg shadow-slate-950/20 hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
              >
                <Link href="#portfolio">
                  View Projects
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-slate-300 bg-white/80 px-7 text-slate-900 hover:border-sky-300 hover:bg-sky-50 dark:border-white/15 dark:bg-slate-900/60 dark:text-white dark:hover:bg-slate-800"
              >
                <a href="mailto:rongcales14@gmail.com">
                  Contact Me
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </Button>
            </div>

            <div
              className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-4 py-2 shadow-sm dark:border-white/10 dark:bg-slate-900/65">
                <FontAwesomeIcon icon={faLocationDot} className="text-sky-500" />
                Based in the Philippines
              </div>
              <a
                href="https://github.com/RandyJan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-4 py-2 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-slate-900/65 dark:hover:border-sky-400/30 dark:hover:text-sky-300"
              >
                <FontAwesomeIcon icon={faGithub} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/randy-jan-rongcales-47b23935b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-4 py-2 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-slate-900/65 dark:hover:border-sky-400/30 dark:hover:text-sky-300"
              >
                <FontAwesomeIcon icon={faLinkedin} />
                LinkedIn
              </a>
            </div>

            <div
              className="grid gap-3 sm:grid-cols-3"
              data-aos="fade-up"
              data-aos-delay="360"
            >
              {quickStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-200/80 bg-white/80 px-5 py-4 shadow-sm dark:border-white/10 dark:bg-slate-900/60"
                >
                  <p className="text-2xl font-bold text-slate-950 dark:text-white">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 lg:scale-110" data-aos="fade-left" data-aos-delay="200">
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sky-500/20 via-transparent to-orange-400/25 blur-2xl" />
              <div className="section-card relative overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 text-white shadow-[0_30px_90px_rgba(15,23,42,0.28)] dark:border-white/10">
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-sky-500/35 to-orange-400/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-3">
                  <Image
                    src="/images/profile/mypix.png"
                    alt="Randy Jan Rongcales portrait"
                    width={720}
                    height={900}
                    priority
                    className="h-auto w-full rounded-[1.25rem] object-cover"
                  />
                </div>
                <div className="relative mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="text-lg font-semibold">Software Developer</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      Code is a conversation between the developer and the
                      future.
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="secondary"
                    className="rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <Link href="#experience">
                      Journey
                      <FontAwesomeIcon icon={faArrowDown} />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
