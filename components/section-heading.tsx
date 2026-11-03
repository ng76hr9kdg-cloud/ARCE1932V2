import type { ReactNode } from 'react'

type SectionHeadingProps = {
  id: string
  eyebrow: string
  title: string
  action?: ReactNode
  inverted?: boolean
}

export function SectionHeading({ id, eyebrow, title, action, inverted = false }: SectionHeadingProps) {
  return (
    <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p
          className={`mb-3 inline-flex items-center gap-3 font-display text-sm font-medium uppercase tracking-[0.3em] ${
            inverted ? 'text-accent' : 'text-muted-foreground'
          }`}
        >
          <span aria-hidden="true" className="h-0.5 w-8 bg-accent" />
          {eyebrow}
        </p>
        <h2
          id={id}
          className={`font-display text-4xl font-semibold uppercase leading-none sm:text-5xl ${
            inverted ? 'text-white' : 'text-foreground'
          }`}
        >
          {title}
        </h2>
      </div>
      {action}
    </div>
  )
}
