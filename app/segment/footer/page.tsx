import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
    <footer className="section-shell pt-6">
      <div className="section-card overflow-hidden px-6 py-8 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-4">
            <div className="section-kicker">Let&apos;s build</div>
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
              Open to meaningful product work, collaboration, and new opportunities.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              If you want someone who cares about clean implementation and the
              user experience around it, let&apos;s talk.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <a
              href="mailto:rongcales14@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-sky-400/30 dark:hover:text-sky-300"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              rongcales14@gmail.com
            </a>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#home"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-sky-400/30 dark:hover:text-sky-300"
              >
                Back to top
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
              <a
                href="https://github.com/RandyJan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-sky-400/30 dark:hover:text-sky-300"
              >
                <FontAwesomeIcon icon={faGithub} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/randy-jan-rongcales-47b23935b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-sky-400/30 dark:hover:text-sky-300"
              >
                <FontAwesomeIcon icon={faLinkedin} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200/80 pt-5 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Built with Next.js, Tailwind CSS, and a stronger focus on clarity,
              hierarchy, and flow.
            </p>
            <Link
              href="/admin"
              className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400 transition hover:text-sky-600 dark:text-slate-500 dark:hover:text-sky-300"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
