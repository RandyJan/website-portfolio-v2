"use client"

import Link from "next/link"
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faFloppyDisk,
  faImage,
  faLock,
  faPlus,
  faRotateLeft,
  faTrash,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons"

import { LinkItem, ProjectType } from "@/app/segment/portfolio/type"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ADMIN_CREDENTIALS,
  CertificationItem,
  DEFAULT_CERTIFICATIONS,
  DEFAULT_EXPERIENCE,
  DEFAULT_PROJECTS,
  ExperienceItem,
  isAdminAuthenticated,
  resetCertificationsContent,
  resetExperienceContent,
  resetProjectsContent,
  saveCertificationsContent,
  saveExperienceContent,
  saveProjectsContent,
  setAdminAuthenticated,
  useCertificationsContent,
  useExperienceContent,
  useProjectsContent,
} from "@/lib/content-store"

type AdminSection = "projects" | "experience" | "certifications"

const sectionOptions: { id: AdminSection; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
]

const emptyProject: ProjectType = {
  name: "",
  project_link: "",
  project_logo: "",
  description: "",
  long_description: "",
  technology: [],
  platform: [],
  status: [],
  type: "",
  role: [],
  source_code: [],
  images_path: "",
  images_num_web: 0,
  images_num_mobile: 0,
  demo_accounts: [],
  higlights: [],
  isWebFirst: true,
}

const emptyExperience: ExperienceItem = {
  icon: "DEV",
  title: "",
  date: "",
  description: [],
  image: "",
}

const emptyCertification: CertificationItem = {
  name: "",
  image: "",
}

const inputClassName =
  "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 dark:border-white/10 dark:bg-slate-900 dark:text-white"

const textareaClassName = inputClassName

function textToLines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean)
}

function arrayToText(value: string[] | undefined) {
  return (value ?? []).join("\n")
}

function sourceCodeToText(value: LinkItem[] | undefined) {
  return (value ?? [])
    .flatMap((entry) => Object.entries(entry).map(([label, url]) => `${label}|${url}`))
    .join("\n")
}

function textToSourceCode(value: string) {
  return textToLines(value).map((line) => {
    const [label, ...rest] = line.split("|")
    return { [label.trim() || "Source"]: rest.join("|").trim() }
  })
}

function demoAccountsToText(
  value: { role: string; username: string; password: string }[] | undefined
) {
  return (value ?? []).map((item) => `${item.role}|${item.username}|${item.password}`).join("\n")
}

function textToDemoAccounts(value: string) {
  return textToLines(value)
    .map((line) => {
      const [role, username, password] = line.split("|").map((item) => item.trim())
      return role && username && password ? { role, username, password } : null
    })
    .filter(Boolean) as { role: string; username: string; password: string }[]
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      {children}
    </label>
  )
}

function SectionLabel({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  )
}

function AdminListCard({
  title,
  subtitle,
  items,
  activeIndex,
  onSelect,
  onCreate,
  onDelete,
  onReset,
}: {
  title: string
  subtitle: string
  items: string[]
  activeIndex: number
  onSelect: (index: number) => void
  onCreate: () => void
  onDelete: () => void
  onReset: () => void
}) {
  return (
    <Card className="rounded-[1.75rem] border border-slate-200/80 bg-white/85 dark:border-white/10 dark:bg-slate-950/70">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full" onClick={onCreate}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Button variant="outline" size="sm" className="rounded-full" onClick={onDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button variant="outline" size="sm" className="rounded-full" onClick={onReset}>
              <FontAwesomeIcon icon={faRotateLeft} />
            </Button>
          </div>
        </div>

        <div className="mt-5 max-h-[38rem] space-y-2 overflow-y-auto pr-1">
          {items.map((item, index) => (
            <button
              key={`${item}-${index}`}
              type="button"
              onClick={() => onSelect(index)}
              className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                activeIndex === index
                  ? "border-sky-300 bg-sky-50 text-sky-900 dark:border-sky-400/30 dark:bg-sky-500/10 dark:text-sky-200"
                  : "border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {item || "Untitled item"}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setAdminAuthenticated(true)
      onLogin()
      return
    }
    setError("Invalid credentials.")
  }

  return (
    <section className="section-shell pt-10">
      <div className="mx-auto max-w-xl">
        <Card className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-950/75">
          <CardContent className="p-8 sm:p-10">
            <div className="mb-8 space-y-4 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-orange-400 text-white shadow-lg shadow-sky-500/25">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">Portfolio Admin</p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Sign in to manage content</h1>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  This page updates browser-local content for projects, work experience, and certifications using the existing JSON shape.
                </p>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <Field label="Username">
                <input value={username} onChange={(event) => setUsername(event.target.value)} className={inputClassName} />
              </Field>
              <Field label="Password">
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className={inputClassName} />
              </Field>
              {error ? <p className="text-sm font-medium text-red-500">{error}</p> : null}
              <Button type="submit" className="w-full rounded-full bg-slate-950 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400">
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [activeSection, setActiveSection] = useState<AdminSection>("projects")
  const { data: projects, isReady: projectsReady } = useProjectsContent()
  const { data: experience, isReady: experienceReady } = useExperienceContent()
  const { data: certifications, isReady: certificationsReady } = useCertificationsContent()

  const [projectItems, setProjectItems] = useState<ProjectType[]>(DEFAULT_PROJECTS)
  const [experienceItems, setExperienceItems] = useState<ExperienceItem[]>(DEFAULT_EXPERIENCE)
  const [certificationItems, setCertificationItems] = useState<CertificationItem[]>(DEFAULT_CERTIFICATIONS)

  const [projectIndex, setProjectIndex] = useState(0)
  const [experienceIndex, setExperienceIndex] = useState(0)
  const [certificationIndex, setCertificationIndex] = useState(0)

  const [projectForm, setProjectForm] = useState<ProjectType>(emptyProject)
  const [experienceForm, setExperienceForm] = useState<ExperienceItem>(emptyExperience)
  const [certificationForm, setCertificationForm] = useState<CertificationItem>(emptyCertification)
  const [projectSourceText, setProjectSourceText] = useState("")
  const [projectDemoText, setProjectDemoText] = useState("")
  const [message, setMessage] = useState("")
  const [isUploadingCertificationImage, setIsUploadingCertificationImage] =
    useState(false)

  useEffect(() => {
    setAuthenticated(isAdminAuthenticated())
  }, [])

  useEffect(() => {
    if (projectsReady) {
      setProjectItems(projects)
      setProjectIndex(0)
    }
  }, [projects, projectsReady])

  useEffect(() => {
    if (experienceReady) {
      setExperienceItems(experience)
      setExperienceIndex(0)
    }
  }, [experience, experienceReady])

  useEffect(() => {
    if (certificationsReady) {
      setCertificationItems(certifications)
      setCertificationIndex(0)
    }
  }, [certifications, certificationsReady])

  useEffect(() => {
    const current = projectItems[projectIndex] ?? emptyProject
    setProjectForm(current)
    setProjectSourceText(sourceCodeToText(current.source_code))
    setProjectDemoText(demoAccountsToText(current.demo_accounts))
  }, [projectIndex, projectItems])

  useEffect(() => {
    setExperienceForm(experienceItems[experienceIndex] ?? emptyExperience)
  }, [experienceIndex, experienceItems])

  useEffect(() => {
    setCertificationForm(certificationItems[certificationIndex] ?? emptyCertification)
  }, [certificationIndex, certificationItems])

  const isReady = projectsReady && experienceReady && certificationsReady

  const selectedProjectLabel = useMemo(() => projectItems[projectIndex]?.name || "New project", [projectIndex, projectItems])
  const selectedExperienceLabel = useMemo(() => experienceItems[experienceIndex]?.title || "New experience entry", [experienceIndex, experienceItems])
  const selectedCertificationLabel = useMemo(() => certificationItems[certificationIndex]?.name || "New certification", [certificationIndex, certificationItems])

  const showMessage = (value: string) => {
    setMessage(value)
    window.setTimeout(() => setMessage(""), 2200)
  }

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />
  }

  if (!isReady) {
    return (
      <section className="section-shell pt-10">
        <div className="section-card px-6 py-12 text-center text-slate-600 dark:text-slate-300">
          Loading admin content...
        </div>
      </section>
    )
  }

  const upsertProject = () => {
    const nextItem: ProjectType = {
      ...projectForm,
      technology: textToLines(arrayToText(projectForm.technology)),
      platform: textToLines(arrayToText(projectForm.platform)),
      status: textToLines(arrayToText(projectForm.status)),
      role: textToLines(arrayToText(projectForm.role)),
      higlights: textToLines(arrayToText(projectForm.higlights)),
      source_code: textToSourceCode(projectSourceText),
      demo_accounts: textToDemoAccounts(projectDemoText),
      images_num_web: Number(projectForm.images_num_web) || 0,
      images_num_mobile: Number(projectForm.images_num_mobile) || 0,
    }
    const nextItems = [...projectItems]
    if (projectItems[projectIndex]) {
      nextItems[projectIndex] = nextItem
    } else {
      nextItems.push(nextItem)
      setProjectIndex(nextItems.length - 1)
    }
    setProjectItems(nextItems)
    saveProjectsContent(nextItems)
    showMessage("Project saved.")
  }

  const upsertExperience = () => {
    const nextItem: ExperienceItem = {
      ...experienceForm,
      description: textToLines(arrayToText(experienceForm.description)),
    }
    const nextItems = [...experienceItems]
    if (experienceItems[experienceIndex]) {
      nextItems[experienceIndex] = nextItem
    } else {
      nextItems.push(nextItem)
      setExperienceIndex(nextItems.length - 1)
    }
    setExperienceItems(nextItems)
    saveExperienceContent(nextItems)
    showMessage("Experience entry saved.")
  }

  const upsertCertification = () => {
    const nextItem: CertificationItem = { ...certificationForm }
    const nextItems = [...certificationItems]
    if (certificationItems[certificationIndex]) {
      nextItems[certificationIndex] = nextItem
    } else {
      nextItems.push(nextItem)
      setCertificationIndex(nextItems.length - 1)
    }
    setCertificationItems(nextItems)
    saveCertificationsContent(nextItems)
    showMessage("Certification saved.")
  }

  const handleCertificationImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    try {
      setIsUploadingCertificationImage(true)
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/admin/certifications/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result = (await response.json()) as { path: string }
      setCertificationForm((prev) => ({ ...prev, image: result.path }))
      showMessage("Image uploaded. Save certification to keep it.")
    } catch {
      showMessage("Image upload failed.")
    } finally {
      setIsUploadingCertificationImage(false)
      event.target.value = ""
    }
  }

  return (
    <section className="section-shell pt-10">
      <div className="section-card overflow-hidden px-6 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">Local Admin</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Manage portfolio content without a database</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Changes are saved in this browser using local storage. The JSON files remain the default fallback, and reset returns each section to those defaults.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/">
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to site
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full" onClick={() => { setAdminAuthenticated(false); setAuthenticated(false) }}>
              Sign out
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {sectionOptions.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeSection === section.id
                  ? "bg-slate-950 text-white dark:bg-sky-500 dark:text-slate-950"
                  : "border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {message ? (
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            {message}
          </div>
        ) : null}

        {activeSection === "projects" ? (
          <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <AdminListCard
              title="Projects"
              subtitle={`${projectItems.length} items`}
              items={projectItems.map((item) => item.name)}
              activeIndex={projectIndex}
              onSelect={setProjectIndex}
              onCreate={() => {
                setProjectItems((prev) => [...prev, { ...emptyProject }])
                setProjectIndex(projectItems.length)
              }}
              onDelete={() => {
                if (!projectItems.length) return
                const next = projectItems.filter((_, index) => index !== projectIndex)
                setProjectItems(next)
                saveProjectsContent(next)
                setProjectIndex(Math.max(0, projectIndex - 1))
                showMessage("Project deleted.")
              }}
              onReset={() => {
                resetProjectsContent()
                setProjectItems(DEFAULT_PROJECTS)
                setProjectIndex(0)
                showMessage("Projects reset to defaults.")
              }}
            />

            <Card className="rounded-[1.75rem] border border-slate-200/80 bg-white/85 dark:border-white/10 dark:bg-slate-950/70">
              <CardContent className="space-y-5 p-6">
                <SectionLabel title={selectedProjectLabel} description="Edit the selected project and save to update the live portfolio cards and dialog." />

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Project name"><input value={projectForm.name} onChange={(event) => setProjectForm((prev) => ({ ...prev, name: event.target.value }))} className={inputClassName} /></Field>
                  <Field label="Project type"><input value={projectForm.type} onChange={(event) => setProjectForm((prev) => ({ ...prev, type: event.target.value }))} className={inputClassName} /></Field>
                  <Field label="Short description"><input value={projectForm.description} onChange={(event) => setProjectForm((prev) => ({ ...prev, description: event.target.value }))} className={inputClassName} /></Field>
                  <Field label="Project link"><input value={projectForm.project_link ?? ""} onChange={(event) => setProjectForm((prev) => ({ ...prev, project_link: event.target.value }))} className={inputClassName} /></Field>
                  <Field label="Project logo path"><input value={projectForm.project_logo} onChange={(event) => setProjectForm((prev) => ({ ...prev, project_logo: event.target.value }))} className={inputClassName} /></Field>
                  <Field label="Images root path"><input value={projectForm.images_path} onChange={(event) => setProjectForm((prev) => ({ ...prev, images_path: event.target.value }))} className={inputClassName} /></Field>
                  <Field label="Web image count"><input type="number" value={projectForm.images_num_web} onChange={(event) => setProjectForm((prev) => ({ ...prev, images_num_web: Number(event.target.value) }))} className={inputClassName} /></Field>
                  <Field label="Mobile image count"><input type="number" value={projectForm.images_num_mobile ?? 0} onChange={(event) => setProjectForm((prev) => ({ ...prev, images_num_mobile: Number(event.target.value) }))} className={inputClassName} /></Field>
                </div>

                <label className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <input type="checkbox" checked={projectForm.isWebFirst} onChange={(event) => setProjectForm((prev) => ({ ...prev, isWebFirst: event.target.checked }))} />
                  Use web images first in previews
                </label>

                <Field label="Long description"><textarea value={projectForm.long_description} onChange={(event) => setProjectForm((prev) => ({ ...prev, long_description: event.target.value }))} className={textareaClassName} rows={4} /></Field>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Technology stack, one per line"><textarea value={arrayToText(projectForm.technology)} onChange={(event) => setProjectForm((prev) => ({ ...prev, technology: textToLines(event.target.value) }))} className={textareaClassName} rows={5} /></Field>
                  <Field label="Platforms, one per line"><textarea value={arrayToText(projectForm.platform)} onChange={(event) => setProjectForm((prev) => ({ ...prev, platform: textToLines(event.target.value) }))} className={textareaClassName} rows={5} /></Field>
                  <Field label="Statuses, one per line"><textarea value={arrayToText(projectForm.status)} onChange={(event) => setProjectForm((prev) => ({ ...prev, status: textToLines(event.target.value) }))} className={textareaClassName} rows={4} /></Field>
                  <Field label="Roles, one per line"><textarea value={arrayToText(projectForm.role)} onChange={(event) => setProjectForm((prev) => ({ ...prev, role: textToLines(event.target.value) }))} className={textareaClassName} rows={4} /></Field>
                </div>

                <Field label="Highlights, one per line"><textarea value={arrayToText(projectForm.higlights)} onChange={(event) => setProjectForm((prev) => ({ ...prev, higlights: textToLines(event.target.value) }))} className={textareaClassName} rows={6} /></Field>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Source code links: Label|URL per line"><textarea value={projectSourceText} onChange={(event) => setProjectSourceText(event.target.value)} className={textareaClassName} rows={5} /></Field>
                  <Field label="Demo accounts: Role|Username|Password per line"><textarea value={projectDemoText} onChange={(event) => setProjectDemoText(event.target.value)} className={textareaClassName} rows={5} /></Field>
                </div>

                <Button className="rounded-full" onClick={upsertProject}>
                  <FontAwesomeIcon icon={faFloppyDisk} />
                  Save project
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {activeSection === "experience" ? (
          <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <AdminListCard
              title="Work Experience"
              subtitle={`${experienceItems.length} items`}
              items={experienceItems.map((item) => item.title)}
              activeIndex={experienceIndex}
              onSelect={setExperienceIndex}
              onCreate={() => {
                setExperienceItems((prev) => [...prev, { ...emptyExperience }])
                setExperienceIndex(experienceItems.length)
              }}
              onDelete={() => {
                if (!experienceItems.length) return
                const next = experienceItems.filter((_, index) => index !== experienceIndex)
                setExperienceItems(next)
                saveExperienceContent(next)
                setExperienceIndex(Math.max(0, experienceIndex - 1))
                showMessage("Experience entry deleted.")
              }}
              onReset={() => {
                resetExperienceContent()
                setExperienceItems(DEFAULT_EXPERIENCE)
                setExperienceIndex(0)
                showMessage("Experience reset to defaults.")
              }}
            />

            <Card className="rounded-[1.75rem] border border-slate-200/80 bg-white/85 dark:border-white/10 dark:bg-slate-950/70">
              <CardContent className="space-y-5 p-6">
                <SectionLabel title={selectedExperienceLabel} description="Edit the selected timeline entry and save to update the public experience section." />
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Icon"><input value={experienceForm.icon} onChange={(event) => setExperienceForm((prev) => ({ ...prev, icon: event.target.value }))} className={inputClassName} /></Field>
                  <Field label="Date"><input value={experienceForm.date} onChange={(event) => setExperienceForm((prev) => ({ ...prev, date: event.target.value }))} className={inputClassName} /></Field>
                </div>
                <Field label="Title"><input value={experienceForm.title} onChange={(event) => setExperienceForm((prev) => ({ ...prev, title: event.target.value }))} className={inputClassName} /></Field>
                <Field label="Image path"><input value={experienceForm.image ?? ""} onChange={(event) => setExperienceForm((prev) => ({ ...prev, image: event.target.value }))} className={inputClassName} /></Field>
                <Field label="Description bullets, one per line"><textarea value={arrayToText(experienceForm.description)} onChange={(event) => setExperienceForm((prev) => ({ ...prev, description: textToLines(event.target.value) }))} className={textareaClassName} rows={8} /></Field>
                <Button className="rounded-full" onClick={upsertExperience}>
                  <FontAwesomeIcon icon={faFloppyDisk} />
                  Save experience
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {activeSection === "certifications" ? (
          <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <AdminListCard
              title="Certifications"
              subtitle={`${certificationItems.length} items`}
              items={certificationItems.map((item) => item.name)}
              activeIndex={certificationIndex}
              onSelect={setCertificationIndex}
              onCreate={() => {
                setCertificationItems((prev) => [...prev, { ...emptyCertification }])
                setCertificationIndex(certificationItems.length)
              }}
              onDelete={() => {
                if (!certificationItems.length) return
                const next = certificationItems.filter((_, index) => index !== certificationIndex)
                setCertificationItems(next)
                saveCertificationsContent(next)
                setCertificationIndex(Math.max(0, certificationIndex - 1))
                showMessage("Certification deleted.")
              }}
              onReset={() => {
                resetCertificationsContent()
                setCertificationItems(DEFAULT_CERTIFICATIONS)
                setCertificationIndex(0)
                showMessage("Certifications reset to defaults.")
              }}
            />

            <Card className="rounded-[1.75rem] border border-slate-200/80 bg-white/85 dark:border-white/10 dark:bg-slate-950/70">
              <CardContent className="space-y-5 p-6">
                <SectionLabel title={selectedCertificationLabel} description="Edit the selected certification and save to update the public certifications section." />
                <Field label="Certification name"><input value={certificationForm.name} onChange={(event) => setCertificationForm((prev) => ({ ...prev, name: event.target.value }))} className={inputClassName} /></Field>
                <Field label="Image path"><input value={certificationForm.image} onChange={(event) => setCertificationForm((prev) => ({ ...prev, image: event.target.value }))} className={inputClassName} /></Field>
                <Field label="Upload image">
                  <div className="space-y-4">
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-sky-300 bg-sky-50/70 px-4 py-6 text-sm font-medium text-sky-700 transition hover:bg-sky-100 dark:border-sky-400/25 dark:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-500/15">
                      <FontAwesomeIcon icon={faImage} />
                      <span>{isUploadingCertificationImage ? "Uploading..." : "Select certificate image"}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleCertificationImageUpload} disabled={isUploadingCertificationImage} />
                    </label>
                    {certificationForm.image ? (
                      <img
                        src={certificationForm.image}
                        alt={certificationForm.name || "Certification preview"}
                        className="max-h-72 rounded-2xl border border-slate-200 object-contain dark:border-white/10"
                      />
                    ) : null}
                  </div>
                </Field>
                <Button className="rounded-full" onClick={upsertCertification}>
                  <FontAwesomeIcon icon={faFloppyDisk} />
                  Save certification
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </section>
  )
}
