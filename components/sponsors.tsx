import Image from 'next/image'
import { ArrowUpRight, Handshake, Star } from 'lucide-react'

type Sponsor = { name: string; category: string; website: string; logo: string }

export function Sponsors({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <section id="sponsor" aria-labelledby="sponsor-title" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-7 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><p className="section-kicker">Insieme si va più lontano</p><h2 id="sponsor-title" className="section-title mt-3 text-[#071a32]">Partner<br /><span className="text-[#b7831c]">di passione.</span></h2></div><p className="max-w-xl text-sm leading-7 text-slate-600">Le aziende e le attività del territorio sono una parte importante del progetto sportivo. Un ringraziamento ai partner che sostengono l'U.S. Arce 1932.</p></div>
        {sponsors.length > 0 ? <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{sponsors.map((sponsor, index) => <a key={`${sponsor.name}-${index}`} href={sponsor.website || '#sponsor'} target={sponsor.website ? '_blank' : undefined} rel={sponsor.website ? 'noreferrer' : undefined} className="flex min-h-[150px] flex-col items-center justify-center border border-slate-200 bg-[#f7f8fa] px-5 py-7 text-center transition-colors hover:border-[#d6a22f] hover:bg-[#fffaf0]">{sponsor.logo ? <div className="relative mb-3 h-16 w-full"><Image src={sponsor.logo} alt={`Logo ${sponsor.name}`} fill sizes="240px" className="object-contain"/></div> : <Star className="size-5 text-[#c18b20]"/>}<span className="text-xs font-black uppercase tracking-[.14em] text-[#071a32]">{sponsor.name}</span><span className="mt-1 text-[9px] font-bold uppercase tracking-[.12em] text-slate-400">{sponsor.category}</span></a>)}</div> : <div className="mt-12 border border-dashed border-slate-300 bg-[#f7f8fa] px-6 py-10 text-center"><Handshake className="mx-auto size-7 text-[#c18b20]"/><p className="mt-3 text-sm font-semibold text-[#071a32]">Vuoi sostenere i colori gialloblù?</p><p className="mt-1 text-xs text-slate-500">Qui presenteremo i partner ufficiali della società.</p></div>}
        <a href="#contatti" className="mt-8 inline-flex items-center gap-3 bg-[#071a32] px-6 py-4 text-[10px] font-black uppercase tracking-[.16em] text-white transition-colors hover:bg-[#b7831c]">Diventa partner dell'Arce <ArrowUpRight className="size-4"/></a>
      </div>
    </section>
  )
}
