"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCertificate,
  faExpand,
  faLayerGroup,
  faPeopleGroup,
  faRocket,
} from "@fortawesome/free-solid-svg-icons"
import { Card, CardContent } from "@/components/ui/card"

import { SectionIntro } from "@/components/section-intro"
import { useCertificationsContent } from "@/lib/content-store"

function getCertificationCategory(name: string) {
  const value = name.toLowerCase()

  if (
    value.includes("scrum") ||
    value.includes("agile") ||
    value.includes("communication") ||
    value.includes("core values")
  ) {
    return {
      label: "Process and teamwork",
      icon: faPeopleGroup,
      note: "Supports collaboration, agile delivery, and team communication.",
    }
  }

  if (
    value.includes("aws") ||
    value.includes("docker") ||
    value.includes("git") ||
    value.includes("ci/cd")
  ) {
    return {
      label: "Delivery and tooling",
      icon: faRocket,
      note: "Shows hands-on interest in deployment, tooling, and workflow quality.",
    }
  }

  return {
    label: "Technical learning",
    icon: faLayerGroup,
    note: "Reflects continuing growth in engineering fundamentals and implementation.",
  }
}

function getCertificationMeta(cert: {
  name: string
  category?: "technical" | "delivery" | "collaboration"
  kind?: "certification" | "achievement"
}) {
  const fallback = getCertificationCategory(cert.name)
  const categoryMap = {
    technical: {
      label: "Technical learning",
      icon: faLayerGroup,
      note: "Reflects continuing growth in engineering fundamentals and implementation.",
    },
    delivery: {
      label: "Delivery and tooling",
      icon: faRocket,
      note: "Shows hands-on interest in deployment, tooling, and workflow quality.",
    },
    collaboration: {
      label: "Process and teamwork",
      icon: faPeopleGroup,
      note: "Supports collaboration, agile delivery, and team communication.",
    },
  } as const

  return {
    category: cert.category ?? (
      fallback.label === "Delivery and tooling"
        ? "delivery"
        : fallback.label === "Process and teamwork"
          ? "collaboration"
          : "technical"
    ),
    kind: cert.kind ?? "certification",
    ...((cert.category ? categoryMap[cert.category] : fallback)),
  }
}

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { data: certifications } = useCertificationsContent()
  const insights = certifications.reduce(
    (acc, cert) => {
      const category = getCertificationMeta(cert).category
      if (category === "technical") acc.technical += 1
      if (category === "delivery") acc.delivery += 1
      if (category === "collaboration") acc.process += 1
      return acc
    },
    { technical: 0, delivery: 0, process: 0 }
  )

  return (
    <section id="certifications" className="section-shell pt-6">
      <div className="section-card px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
        <SectionIntro
          eyebrow="Continuous learning"
          title="Training and certifications that back up the work."
          description="A growing record of technical study, agile practice, communication training, and platform-specific upskilling."
          aside={
            <div className="inline-flex items-center gap-3 rounded-full border border-orange-200/70 bg-orange-50/80 px-4 py-3 text-sm font-semibold text-orange-800 dark:border-orange-400/20 dark:bg-slate-900/70 dark:text-orange-300">
              <FontAwesomeIcon icon={faCertificate} />
              {certifications.length} documents
            </div>
          }
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-5 py-5 shadow-sm dark:border-white/10 dark:bg-slate-950/55">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
              Technical
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
              {insights.technical}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Courses and certifications tied to engineering skills and implementation.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-5 py-5 shadow-sm dark:border-white/10 dark:bg-slate-950/55">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
              Delivery
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
              {insights.delivery}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Learning focused on deployment, workflows, DevOps practices, and tooling.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-5 py-5 shadow-sm dark:border-white/10 dark:bg-slate-950/55">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
              Collaboration
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
              {insights.process}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Training around agile practice, communication, and effective teamwork.
            </p>
          </div>
        </div>

        <div className="section-grid mt-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {certifications.map((cert, index) => (
            (() => {
              const category = getCertificationMeta(cert)

              return (
                <Card
                  key={`${cert.name}-${index}`}
                  className="group cursor-pointer overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 shadow-[0_18px_55px_rgba(15,23,42,0.07)] transition duration-500 hover:-translate-y-1.5 hover:border-orange-300 dark:border-white/10 dark:bg-slate-950/65 dark:hover:border-orange-400/20"
                  data-aos="fade-up"
                  data-aos-delay={120 + index * 60}
                  onClick={() => setSelectedImage(cert.image)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-90" />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-md">
                        <FontAwesomeIcon icon={category.icon} />
                        {category.label}
                      </div>
                      <div className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md transition group-hover:scale-105">
                        <FontAwesomeIcon icon={faExpand} />
                      </div>
                    </div>

                    <div className="space-y-3 p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600 dark:text-orange-300">
                        {category.kind}
                      </p>
                      <h3 className="min-h-[5.25rem] text-lg font-semibold leading-7 text-slate-950 dark:text-white">
                        {cert.name}
                      </h3>
                      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {category.note}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })()
          ))}
        </div>
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected certificate"
            className="max-h-[92vh] max-w-[92vw] rounded-[1.5rem] border border-white/10 shadow-2xl"
          />
        </div>
      ) : null}
    </section>
  )
}
