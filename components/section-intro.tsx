import { ReactNode } from "react"

type SectionIntroProps = {
  eyebrow: string
  title: string
  description: string
  aside?: ReactNode
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  aside,
}: SectionIntroProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-4">
        <div className="section-kicker">{eyebrow}</div>
        <div className="space-y-3">
          <h2 className="section-title">{title}</h2>
          <p className="section-copy">{description}</p>
        </div>
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  )
}
