import Image from 'next/image'
import { ArrowUpRight, Mail, MapPin, Phone, Shield } from 'lucide-react'

type Contacts = { email: string; phone: string; address: string }

export function SiteFooter({ contacts }: { contacts: Contacts }) {
  const year = new Date().getFullYear()
  return (
    <footer id="contatti" className="bg-[#041326] text-white">
      <div className="h-1.5 bg-[#f2bd42]" />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-7 lg:grid-cols-[1.2fr_.8fr] lg:px-10 lg:py-20">
        <div><div className="flex items-center gap-4"><Image src="/images/logo-usarce.jpg" alt="Stemma U.S. Arce 1932" width={76} height={76} className="size-16 rounded-full border border-white/20"/><div><div className="font-display text-3xl font-semibold uppercase">U.S. Arce 1932</div><div className="mt-1 text-[9px] font-bold uppercase tracking-[.3em] text-[#f2bd42]">Una storia che continua</div></div></div>
          <p className="mt-7 max-w-lg text-sm leading-7 text-white/55">Una società sportiva, una comunità, una passione che attraversa le generazioni. I colori gialloblù raccontano il legame con Arce.</p>
          {contacts.address && <div className="mt-7 flex items-center gap-3 text-xs text-white/55"><MapPin className="size-4 text-[#f2bd42]"/>{contacts.address}</div>}
          <div className="mt-3 flex flex-wrap gap-5 text-xs text-white/55">{contacts.email && <a href={`mailto:${contacts.email}`} className="inline-flex items-center gap-2 hover:text-[#f2bd42]"><Mail className="size-4 text-[#f2bd42]"/>{contacts.email}</a>}{contacts.phone && <a href={`tel:${contacts.phone.replace(/[^+\d]/g, '')}`} className="inline-flex items-center gap-2 hover:text-[#f2bd42]"><Phone className="size-4 text-[#f2bd42]"/>{contacts.phone}</a>}</div>
        </div>
        <div className="flex flex-col justify-between gap-8 lg:items-end lg:text-right"><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#f2bd42]">Vuoi entrare in contatto?</p><h2 className="display-title mt-3 text-4xl font-semibold uppercase leading-[.94] sm:text-5xl">Parliamo<br/>di calcio.</h2><p className="mt-4 max-w-sm text-sm leading-6 text-white/55 lg:ml-auto">Per informazioni, collaborazioni, settore giovanile e sponsorizzazioni, scrivi o telefona alla società.</p>{contacts.email && <a href={`mailto:${contacts.email}`} className="mt-6 inline-flex items-center gap-3 border-b border-[#f2bd42] pb-2 text-[10px] font-black uppercase tracking-[.16em] text-white transition-colors hover:text-[#f2bd42]">Scrivi alla società <ArrowUpRight className="size-4 text-[#f2bd42]"/></a>}</div><div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.2em] text-white/35"><Shield className="size-4 text-[#f2bd42]"/> Dal 1932, con orgoglio</div></div>
      </div>
      <div className="border-t border-white/10"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-5 text-[9px] font-medium uppercase tracking-[.13em] text-white/35 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10"><p>© {year} U.S. Arce 1932 · Tutti i diritti riservati</p><p className="flex items-center gap-4"><span>Realizzato per i colori gialloblù</span><a href="/admin" className="transition-colors hover:text-[#f2bd42]">Area riservata</a></p></div></div>
    </footer>
  )
}
