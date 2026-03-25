"use client"

import { useEffect, useState } from "react"

import defaultCertifications from "@/app/segment/certifications/values.json"
import defaultExperience from "@/app/segment/experience/value.json"
import defaultProjects from "@/app/segment/portfolio/values/project_values.json"
import { ProjectType } from "@/app/segment/portfolio/type"

export type ExperienceItem = {
  icon: string
  title: string
  date: string
  description: string[]
  image?: string
}

export type CertificationItem = {
  name: string
  image: string
  category?: "technical" | "delivery" | "collaboration"
  kind?: "certification" | "achievement"
}

export const CONTENT_STORAGE_KEYS = {
  projects: "portfolio_admin_projects",
  experience: "portfolio_admin_experience",
  certifications: "portfolio_admin_certifications",
  auth: "portfolio_admin_authenticated",
} as const

export const ADMIN_CREDENTIALS = {
  username: "RJRongcales",
  password: "RJRongcales01252000",
} as const

export const DEFAULT_PROJECTS: ProjectType[] = defaultProjects as ProjectType[]
export const DEFAULT_EXPERIENCE: ExperienceItem[] =
  defaultExperience as ExperienceItem[]
export const DEFAULT_CERTIFICATIONS: CertificationItem[] =
  defaultCertifications.Certifications as CertificationItem[]

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return clone(fallback)
  }

  const raw = window.localStorage.getItem(key)
  if (!raw) {
    return clone(fallback)
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    return clone(fallback)
  }
}

function writeStoredValue<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new CustomEvent("portfolio-content-updated", { detail: key }))
}

function removeStoredValue(key: string) {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.removeItem(key)
  window.dispatchEvent(new CustomEvent("portfolio-content-updated", { detail: key }))
}

function useStoredContent<T>(key: string, fallback: T) {
  const [data, setData] = useState<T>(() => clone(fallback))
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setData(readStoredValue(key, fallback))
    setIsReady(true)

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        setData(readStoredValue(key, fallback))
      }
    }

    const handleCustom = (event: Event) => {
      const customEvent = event as CustomEvent<string>
      if (customEvent.detail === key) {
        setData(readStoredValue(key, fallback))
      }
    }

    window.addEventListener("storage", handleStorage)
    window.addEventListener("portfolio-content-updated", handleCustom)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("portfolio-content-updated", handleCustom)
    }
  }, [fallback, key])

  return { data, isReady }
}

export function useProjectsContent() {
  return useStoredContent<ProjectType[]>(
    CONTENT_STORAGE_KEYS.projects,
    DEFAULT_PROJECTS
  )
}

export function useExperienceContent() {
  return useStoredContent<ExperienceItem[]>(
    CONTENT_STORAGE_KEYS.experience,
    DEFAULT_EXPERIENCE
  )
}

export function useCertificationsContent() {
  return useStoredContent<CertificationItem[]>(
    CONTENT_STORAGE_KEYS.certifications,
    DEFAULT_CERTIFICATIONS
  )
}

export function saveProjectsContent(value: ProjectType[]) {
  writeStoredValue(CONTENT_STORAGE_KEYS.projects, value)
}

export function saveExperienceContent(value: ExperienceItem[]) {
  writeStoredValue(CONTENT_STORAGE_KEYS.experience, value)
}

export function saveCertificationsContent(value: CertificationItem[]) {
  writeStoredValue(CONTENT_STORAGE_KEYS.certifications, value)
}

export function resetProjectsContent() {
  removeStoredValue(CONTENT_STORAGE_KEYS.projects)
}

export function resetExperienceContent() {
  removeStoredValue(CONTENT_STORAGE_KEYS.experience)
}

export function resetCertificationsContent() {
  removeStoredValue(CONTENT_STORAGE_KEYS.certifications)
}

export function isAdminAuthenticated() {
  if (typeof window === "undefined") {
    return false
  }

  return window.sessionStorage.getItem(CONTENT_STORAGE_KEYS.auth) === "true"
}

export function setAdminAuthenticated(value: boolean) {
  if (typeof window === "undefined") {
    return
  }

  if (value) {
    window.sessionStorage.setItem(CONTENT_STORAGE_KEYS.auth, "true")
  } else {
    window.sessionStorage.removeItem(CONTENT_STORAGE_KEYS.auth)
  }
}
