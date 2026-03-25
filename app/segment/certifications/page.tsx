"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCertificate, faExpand } from "@fortawesome/free-solid-svg-icons"
import { Card, CardContent } from "@/components/ui/card"

import { SectionIntro } from "@/components/section-intro"
import { useCertificationsContent } from "@/lib/content-store"

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { data: certifications } = useCertificationsContent()

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

        <div className="section-grid mt-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {certifications.map((cert, index) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md transition group-hover:scale-105">
                    <FontAwesomeIcon icon={faExpand} />
                  </div>
                </div>

                <div className="space-y-2 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600 dark:text-orange-300">
                    Certification
                  </p>
                  <h3 className="min-h-[5.25rem] text-lg font-semibold leading-7 text-slate-950 dark:text-white">
                    {cert.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
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
