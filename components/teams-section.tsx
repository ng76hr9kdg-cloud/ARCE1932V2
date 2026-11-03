import Image from 'next/image'
import { ArrowUpRight, Users } from 'lucide-react'

type TeamPromoProps = {
  id: string
  eyebrow: string
  title: string
  description: string
  cta: string
  image: string
  imageAlt: string
  reverse?: boolean
}

export function TeamPromo({ id, eyebrow, title, description, cta, image, imageAlt, reverse }: TeamPromoProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`grid bg-[#08264b] lg:min-h-[560px] lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[.24em] text-[#f2bd42]"><Users className="size-4" /> {eyebrow}</div>
        <h2 id={`${id}-title`} className="display-title mt-6 max-w-xl text-5xl font-semibold leading-[.9] text-white sm:text-7xl">{title}</h2>
        <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 sm:text-base">{description}</p>
        <a href="#contatti" className="mt-9 inline-flex w-fit items-center gap-4 border-b-2 border-[#f2bd42] pb-3 text-[10px] font-black uppercase tracking-[.17em] text-white transition-all hover:gap-6">{cta}<ArrowUpRight className="size-4 text-[#f2bd42]" /></a>
        <div className="mt-14 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.2em] text-white/35"><span className="h-px w-8 bg-[#f2bd42]" /> Formiamo squadra, ogni giorno</div>
      </div>
      <div className="relative min-h-[350px] overflow-hidden lg:min-h-full">
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-[1.025]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061a32]/35 to-transparent" />
        <div className="absolute bottom-6 left-6 border-l-2 border-[#f2bd42] pl-4 text-[9px] font-bold uppercase tracking-[.2em] text-white/85">U.S. Arce · 1932</div>
      </div>
    </section>
  )
}
