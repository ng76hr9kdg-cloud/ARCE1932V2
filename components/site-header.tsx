'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const nav = [
  { label: 'Il Club', href: '#club' },
  { label: 'Prima squadra', href: '#prima-squadra' },
  { label: 'Giovanili', href: '#giovanili' },
  { label: 'Notizie', href: '#notizie' },
  { label: 'Sponsor', href: '#sponsor' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061a32]/95 text-white shadow-[0_8px_35px_rgba(0,0,0,.18)] backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-4 sm:px-7 lg:px-10">
        <Link href="/" aria-label="U.S. Arce 1932, homepage" className="group flex items-center gap-3">
          <Image src="/images/logo-usarce.jpg" alt="Stemma U.S. Arce 1932" width={58} height={58} priority className="size-12 rounded-full ring-2 ring-[#f2bd42]/70 transition-transform group-hover:rotate-[-5deg] sm:size-[54px]" />
          <span className="leading-none">
            <span className="block font-display text-[22px] font-semibold uppercase tracking-[.025em]">U.S. ARCE</span>
            <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.36em] text-[#f2bd42]">1932 · Official Website</span>
          </span>
        </Link>

        <nav aria-label="Navigazione principale" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="group relative py-3 text-[11px] font-extrabold uppercase tracking-[.12em] text-white/75 transition-colors hover:text-white">
              {item.label}
              <span className="absolute inset-x-0 bottom-1 h-[2px] origin-left scale-x-0 bg-[#f2bd42] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a href="#contatti" className="hidden items-center gap-2 bg-[#f2bd42] px-5 py-3 text-[10px] font-black uppercase tracking-[.15em] text-[#071a32] transition-all hover:-translate-y-0.5 hover:bg-white lg:inline-flex">
          Entra in contatto <ArrowUpRight className="size-4" />
        </a>

        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Chiudi menu' : 'Apri menu'} className="flex size-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#f2bd42] hover:text-[#f2bd42] lg:hidden">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Navigazione mobile" className="border-t border-white/10 bg-[#061a32] px-4 pb-5 pt-2 lg:hidden">
          {nav.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/10 py-4 text-xs font-extrabold uppercase tracking-[.15em] text-white/85">
              <span><span className="mr-4 text-[#f2bd42]">0{index + 1}</span>{item.label}</span>
              <ArrowUpRight className="size-4 text-[#f2bd42]" />
            </a>
          ))}
          <a href="#contatti" onClick={() => setOpen(false)} className="mt-5 flex items-center justify-center bg-[#f2bd42] px-5 py-4 text-xs font-black uppercase tracking-widest text-[#071a32]">Contatta la società</a>
        </nav>
      )}
    </header>
  )
}
