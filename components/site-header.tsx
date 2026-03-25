"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import {
  useCertificationsContent,
  useProjectsContent,
} from "@/lib/content-store"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { data: projects } = useProjectsContent()
  const { data: certifications } = useCertificationsContent()

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#portfolio", label: "Portfolio", count: projects.length },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    {
      href: "#certifications",
      label: "Certifications",
      count: certifications.length,
    },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/30 bg-white/65 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/90 text-sm font-bold text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200">
            RR
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-[0.24em] text-sky-700 dark:text-sky-300">
              RANDY JAN
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Software Developer Portfolio
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-sky-400/30 dark:hover:text-sky-300 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/30 px-4 py-4 dark:border-white/10 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                mobile
                onClick={() => setOpen(false)}
              />
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}

type NavItemProps = {
  href: string
  label: string
  count?: number
  mobile?: boolean
  onClick?: () => void
}

function NavItem({ href, label, count, mobile, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full transition-all",
        mobile
          ? "justify-between border border-slate-200/80 bg-white/75 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-900/65 dark:text-slate-200"
          : "px-4 py-2 text-sm font-medium text-slate-600 hover:bg-white/80 hover:text-sky-700 dark:text-slate-300 dark:hover:bg-slate-900/80 dark:hover:text-sky-300",
      ].join(" ")}
    >
      <span>{label}</span>
      {typeof count === "number" ? (
        <span className="inline-flex min-w-[1.65rem] items-center justify-center rounded-full border border-slate-200/80 bg-slate-100/90 px-2 py-0.5 text-[0.7rem] font-semibold text-slate-500 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-300">
          {count}
        </span>
      ) : null}
    </Link>
  )
}
