import Image from "next/image"
import { Card } from "@/components/ui/card"

type TimelineEvent = {
  icon: string
  title: string
  date: string
  description: string | string[]
  image?: string
}

const Timeline = ({ events }: { events: TimelineEvent[] }) => {
  return (
    <div className="relative mt-12">
      <div className="absolute bottom-0 left-5 top-0 hidden w-px bg-gradient-to-b from-sky-400/60 via-sky-500/30 to-orange-400/50 lg:block" />

      <div className="space-y-8 lg:space-y-10">
        {events.map((event, index) => (
          <div
            key={event.title}
            className="relative grid gap-5 lg:grid-cols-[auto_1fr]"
            data-aos="fade-up"
            data-aos-delay={120 + index * 80}
          >
            <div className="hidden lg:flex">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-orange-400 text-lg shadow-lg shadow-sky-500/25">
                <span>{event.icon}</span>
              </div>
            </div>

            <Card className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 shadow-[0_18px_60px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-slate-950/65">
              <div className="grid gap-0 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="p-6 sm:p-8">
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-orange-400 text-lg shadow-lg shadow-sky-500/25 lg:hidden">
                      <span>{event.icon}</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold tracking-tight text-slate-950 sm:text-2xl dark:text-white">
                        {event.title}
                      </p>
                      <p className="mt-1 text-sm font-medium text-sky-700 dark:text-sky-300">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  {Array.isArray(event.description) ? (
                    <ul className="space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {event.description.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-gradient-to-r from-sky-500 to-orange-400" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {event.description}
                    </p>
                  )}
                </div>

                {event.image ? (
                  <div className="relative min-h-[220px] border-t border-slate-200/80 bg-slate-100 dark:border-white/10 dark:bg-slate-900 xl:min-h-full xl:border-l xl:border-t-0">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                  </div>
                ) : null}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
