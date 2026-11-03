import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { MainSponsorBanner } from '@/components/main-sponsor-banner'
import { NewsGrid } from '@/components/news-grid'
import { TeamPromo } from '@/components/teams-section'
import { MatchCenter } from '@/components/match-center'
import { Sponsors } from '@/components/sponsors'
import { SiteFooter } from '@/components/site-footer'
import Image from 'next/image'
import { ArrowUpRight, Landmark, HeartHandshake, Flag } from 'lucide-react'
import siteContent from '@/content/site-content.json'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <MainSponsorBanner />

        <section id="club" aria-labelledby="club-title" className="bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-7 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-10">
            <div className="relative mx-auto w-full max-w-[540px]">
              <div className="absolute -left-4 -top-4 h-2/3 w-2/3 border-l-2 border-t-2 border-[#f2bd42]" />
              <div className="relative aspect-[4/5] overflow-hidden bg-[#08264b] p-8 sm:p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(242,189,66,.16),transparent_60%)]" />
                <div className="relative flex h-full flex-col items-center justify-center text-center">
                  <Image src="/images/logo-usarce.jpg" alt="Stemma ufficiale U.S. Arce 1932" width={240} height={240} className="w-[62%] max-w-[240px] rounded-full shadow-[0_25px_55px_rgba(0,0,0,.25)]" />
                  <p className="display-title mt-8 text-5xl font-semibold uppercase tracking-[.06em] text-white sm:text-6xl">1932</p>
                  <p className="mt-2 text-[9px] font-black uppercase tracking-[.32em] text-[#f2bd42]">Le nostre radici</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-3 bg-[#f2bd42] px-5 py-4 text-[9px] font-black uppercase tracking-[.18em] text-[#071a32] sm:-right-5 sm:px-7">Arce · Ciociaria</div>
            </div>
            <div className="lg:py-8">
              <p className="section-kicker">La nostra identità</p>
              <h2 id="club-title" className="section-title mt-4 text-[#071a32]">Non è solo<br />una squadra.<br /><span className="text-[#b7831c]">È Arce.</span></h2>
              <p className="mt-7 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">L'U.S. Arce 1932 rappresenta un legame che va oltre il terreno di gioco: appartenenza, impegno, passione e voglia di crescere insieme. Una storia che si rinnova ogni volta che si indossa la maglia gialloblù.</p>
              <div className="mt-9 grid gap-5 border-t border-slate-200 pt-7 sm:grid-cols-3">
                <div className="flex gap-3"><Landmark className="mt-1 size-5 shrink-0 text-[#b7831c]" /><div><p className="text-xs font-black uppercase tracking-wide text-[#071a32]">Territorio</p><p className="mt-1 text-xs leading-5 text-slate-500">Un'identità legata al paese.</p></div></div>
                <div className="flex gap-3"><HeartHandshake className="mt-1 size-5 shrink-0 text-[#b7831c]" /><div><p className="text-xs font-black uppercase tracking-wide text-[#071a32]">Comunità</p><p className="mt-1 text-xs leading-5 text-slate-500">Una passione da condividere.</p></div></div>
                <div className="flex gap-3"><Flag className="mt-1 size-5 shrink-0 text-[#b7831c]" /><div><p className="text-xs font-black uppercase tracking-wide text-[#071a32]">Tradizione</p><p className="mt-1 text-xs leading-5 text-slate-500">Dal 1932, guardando avanti.</p></div></div>
              </div>
              <a href="#prima-squadra" className="mt-9 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[.17em] text-[#071a32] transition-all hover:gap-5">Scopri le nostre squadre <ArrowUpRight className="size-4 text-[#b7831c]" /></a>
            </div>
          </div>
        </section>

        <NewsGrid news={siteContent.news} />
        <TeamPromo
          id="prima-squadra"
          eyebrow="Prima squadra"
          title="I colori che ci uniscono."
          description="La prima squadra è il volto dell'U.S. Arce sul campo: lavoro quotidiano, spirito di gruppo e orgoglio di rappresentare il paese. In questa sezione troverai rosa, staff, comunicati e aggiornamenti ufficiali."
          cta="Informazioni sulla squadra"
          image="/images/prima-squadra.png"
          imageAlt="Calciatore in maglia blu in un campo illuminato, immagine provvisoria"
        />
        <MatchCenter matches={siteContent.matches} />
        <TeamPromo
          id="giovanili"
          eyebrow="Settore giovanile"
          title="Il futuro veste gialloblù."
          description="Il settore giovanile è il luogo in cui si cresce attraverso il gioco, il rispetto e il lavoro di squadra. Qui saranno raccolte le informazioni sulle categorie, gli allenatori e le attività."
          cta="Richiedi informazioni"
          image="/images/settore-giovanile.png"
          imageAlt="Giovani calciatori durante un allenamento, immagine provvisoria"
          reverse
        />
        <Sponsors sponsors={siteContent.sponsors} />
      </main>
      <SiteFooter contacts={siteContent.contacts} />
    </>
  )
}
