import Image from 'next/image'
import { ArrowUpRight, Newspaper } from 'lucide-react'

type NewsItem = { image: string; category: string; title: string; text: string }

export function NewsGrid({ news }: { news: NewsItem[] }) {
  return (
    <section id="notizie" aria-labelledby="notizie-title" className="bg-[#f5f6f8] py-20 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-7 lg:px-10">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div><p className="section-kicker">Dentro il mondo gialloblù</p><h2 id="notizie-title" className="section-title mt-3 text-[#071a32]">Le storie<br /><span className="text-[#b7831c]">da vivere.</span></h2></div>
          <p className="max-w-md text-sm leading-7 text-slate-600">News, appuntamenti e racconti della società. Uno spazio per restare vicini alla squadra e a tutta la famiglia Arce.</p>
        </div>

        {news.length > 0 ? <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {news.map((story, index) => (
            <article key={`${story.title}-${index}`} className="group relative flex min-h-[440px] flex-col overflow-hidden bg-white shadow-[0_16px_45px_rgba(7,26,50,.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(7,26,50,.12)]">
              <div className="relative h-[250px] overflow-hidden bg-[#08264b]">
                {story.image && <Image src={story.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a32]/50 to-transparent" />
                <span className="absolute left-5 top-5 bg-[#f2bd42] px-3 py-2 text-[9px] font-black uppercase tracking-[.15em] text-[#071a32]">{story.category}</span>
                <span className="display-title absolute bottom-3 right-5 text-6xl font-bold leading-none text-white/80">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-display text-3xl font-semibold uppercase leading-[.98] text-[#071a32]">{story.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{story.text}</p>
                <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-5"><span className="text-[9px] font-extrabold uppercase tracking-[.18em] text-slate-400">U.S. Arce 1932</span><span className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-[#071a32] transition-all group-hover:border-[#f2bd42] group-hover:bg-[#f2bd42]"><ArrowUpRight className="size-4" /></span></div>
              </div>
            </article>
          ))}
        </div> : <div className="mt-12 border border-dashed border-slate-300 bg-white p-10 text-center"><Newspaper className="mx-auto size-8 text-[#b7831c]"/><p className="mt-3 font-semibold text-[#071a32]">Le notizie saranno pubblicate qui.</p></div>}
        <div className="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-500"><Newspaper className="size-4 text-[#b7831c]" /> Aggiornamenti ufficiali della società</div>
      </div>
    </section>
  )
}
