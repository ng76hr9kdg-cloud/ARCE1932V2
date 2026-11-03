import { Handshake, ArrowUpRight } from 'lucide-react'

export function MainSponsorBanner() {
  return (
    <aside aria-label="Opportunità sponsor" className="relative overflow-hidden bg-[#f2bd42]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-4 py-7 sm:px-7 md:flex-row md:items-center md:justify-between lg:px-10">
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center border border-[#071a32]/20 bg-[#071a32] text-[#f2bd42]"><Handshake className="size-6" /></span>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[.25em] text-[#071a32]/65">Partner del territorio</p>
            <p className="mt-1 font-display text-2xl font-semibold uppercase leading-none text-[#071a32] sm:text-3xl">Cresciamo insieme.</p>
          </div>
        </div>
        <p className="max-w-md text-sm font-medium leading-6 text-[#071a32]/80">Sostieni i colori gialloblù e diventa parte del percorso dell'U.S. Arce 1932.</p>
        <a href="#sponsor" className="inline-flex shrink-0 items-center gap-3 border-b-2 border-[#071a32] pb-2 text-[10px] font-black uppercase tracking-[.15em] text-[#071a32] transition-all hover:gap-5">Scopri le opportunità <ArrowUpRight className="size-4" /></a>
      </div>
    </aside>
  )
}
