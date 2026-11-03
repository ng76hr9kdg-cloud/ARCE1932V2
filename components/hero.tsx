import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Shield } from 'lucide-react'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate min-h-[690px] overflow-hidden bg-[#041326] text-white sm:min-h-[740px] lg:min-h-[790px]">
      <Image src="/images/hero-stadium.png" alt="Campo da calcio illuminato al tramonto" fill priority sizes="100vw" className="-z-30 object-cover object-center" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(3,16,32,.96)_0%,rgba(3,16,32,.82)_42%,rgba(3,16,32,.18)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(3,16,32,.96)_0%,rgba(3,16,32,.08)_68%)]" />
      <div className="absolute right-[-8rem] top-16 -z-10 hidden size-[34rem] rounded-full border border-white/10 lg:block" />
      <div className="absolute right-[-4rem] top-32 -z-10 hidden size-[26rem] rounded-full border border-[#f2bd42]/25 lg:block" />

      <div className="mx-auto flex min-h-[690px] max-w-[1440px] flex-col justify-between px-4 pb-8 pt-16 sm:min-h-[740px] sm:px-7 sm:pt-24 lg:min-h-[790px] lg:px-10 lg:pb-10">
        <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.3em] text-[#f2bd42]">
          <span className="h-px w-10 bg-[#f2bd42]" /> Dal 1932 · Arce, Italia
        </div>

        <div className="max-w-4xl pb-8 sm:pb-12">
          <div className="mb-6 flex items-center gap-3">
            <Image src="/images/logo-usarce.jpg" alt="" width={56} height={56} className="size-12 rounded-full border border-white/40 bg-white sm:size-14" />
            <div className="text-[10px] font-bold uppercase leading-relaxed tracking-[.2em] text-white/65">
              Una comunità.<br /><span className="text-white">Gli stessi colori, da generazioni.</span>
            </div>
          </div>
          <h1 id="hero-title" className="display-title max-w-4xl text-[clamp(4rem,10vw,9.5rem)] font-bold leading-[.82] text-white">
            La passione<br /><span className="text-[#f2bd42]">ha una</span><br />storia.
          </h1>
          <p className="mt-8 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            Dal 1932, il calcio è parte della vita di Arce. Una maglia, un paese, tante generazioni: il nostro cammino continua insieme.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="#club" className="inline-flex min-h-14 items-center justify-center gap-4 bg-[#f2bd42] px-7 text-[11px] font-black uppercase tracking-[.15em] text-[#071a32] transition-all hover:-translate-y-1 hover:bg-white">
              Scopri il club <ArrowRight className="size-4" />
            </Link>
            <Link href="#notizie" className="inline-flex min-h-14 items-center justify-center gap-4 border border-white/35 bg-white/5 px-7 text-[11px] font-black uppercase tracking-[.15em] text-white backdrop-blur transition-colors hover:border-white hover:bg-white/10">
              Le novità gialloblù <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-white/20 pt-5">
          <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.22em] text-white/55">
            <Shield className="size-4 text-[#f2bd42]" /> U.S. Arce 1932
          </div>
          <a href="#club" className="inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.2em] text-white/65 transition-colors hover:text-[#f2bd42]">
            Scorri per entrare <ArrowDown className="size-4 animate-bounce text-[#f2bd42]" />
          </a>
        </div>
      </div>
    </section>
  )
}
