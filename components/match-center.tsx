import { ArrowUpRight, CalendarDays, CircleDot, Trophy } from 'lucide-react'

type Match = {
  date: string; time: string; opponent: string; home: boolean; competition: string; venue: string
  status: 'upcoming' | 'played'; arceScore: number | null; opponentScore: number | null
}

function dateLabel(value: string) {
  const date = new Date(`${value}T12:00:00`)
  return new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: '2-digit', month: 'long' }).format(date)
}

export function MatchCenter({ matches }: { matches: Match[] }) {
  const upcoming = matches.filter((item) => item.status === 'upcoming').sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2)
  const played = matches.filter((item) => item.status === 'played').sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2)

  return (
    <section id="partite" aria-labelledby="partite-title" className="relative overflow-hidden bg-[#061a32] py-20 text-white sm:py-24">
      <div className="absolute -right-28 -top-28 size-[34rem] rounded-full border border-white/[.06]" /><div className="absolute -right-12 -top-12 size-[22rem] rounded-full border border-[#f2bd42]/15" />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-7 lg:px-10">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="text-[10px] font-black uppercase tracking-[.25em] text-[#f2bd42]">Segui il cammino</p><h2 id="partite-title" className="display-title mt-3 text-5xl font-semibold leading-[.92] sm:text-7xl">Il campo<br /><span className="text-[#f2bd42]">ci aspetta.</span></h2></div><p className="max-w-md text-sm leading-7 text-white/60">Calendario, risultati e classifiche: qui trovi gli aggiornamenti ufficiali delle squadre dell'U.S. Arce 1932.</p></div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div className="border border-white/10 bg-[#0b2a50] p-6 sm:p-8">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[.2em] text-[#f2bd42]"><CalendarDays className="size-4" /> Prossime partite</div>
            {upcoming.length > 0 ? <div className="mt-7 space-y-3">{upcoming.map((match, index) => <article key={`${match.date}-${match.opponent}-${index}`} className="border border-white/10 bg-white/[.04] p-5"><div className="flex flex-wrap items-center justify-between gap-2 text-[9px] font-bold uppercase tracking-[.15em] text-white/45"><span>{match.competition || 'Campionato'}</span><span>{dateLabel(match.date)}{match.time ? ` · ${match.time}` : ''}</span></div><div className="mt-5 flex items-center justify-between gap-4"><div><p className="display-title text-2xl font-semibold uppercase sm:text-3xl">{match.home ? 'U.S. Arce' : match.opponent}</p><p className="mt-1 text-xs text-white/45">{match.home ? 'Casa' : 'Trasferta'}</p></div><span className="text-[10px] font-black uppercase tracking-[.2em] text-[#f2bd42]">VS</span><div className="text-right"><p className="display-title text-2xl font-semibold uppercase sm:text-3xl">{match.home ? match.opponent : 'U.S. Arce'}</p><p className="mt-1 text-xs text-white/45">{match.venue}</p></div></div></article>)}</div> : <div className="mt-7 border border-dashed border-white/15 px-5 py-10 text-center"><CircleDot className="mx-auto size-7 text-[#f2bd42]"/><p className="mt-3 font-display text-2xl font-semibold uppercase">Prossime gare in aggiornamento</p><p className="mt-2 text-xs leading-5 text-white/50">Il calendario ufficiale sarà pubblicato qui dalla società.</p></div>}
          </div>

          <div className="bg-white p-6 text-[#071a32] sm:p-8">
            <div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-[.2em] text-[#a97712]">Ultimi risultati</span><Trophy className="size-5 text-[#a97712]"/></div>
            {played.length > 0 ? <div className="mt-7 space-y-3">{played.map((match, index) => <article key={`${match.date}-${match.opponent}-${index}`} className="border border-slate-200 p-5"><div className="flex items-center justify-between gap-2 text-[9px] font-bold uppercase tracking-[.15em] text-slate-400"><span>{match.competition || 'Campionato'}</span><span>{dateLabel(match.date)}</span></div><div className="mt-5 flex items-center justify-between gap-3"><span className="display-title flex-1 text-xl font-semibold uppercase">{match.home ? 'U.S. Arce' : match.opponent}</span><span className="display-title bg-[#08264b] px-3 py-2 text-2xl font-semibold text-white">{match.home ? match.arceScore ?? '–' : match.opponentScore ?? '–'} : {match.home ? match.opponentScore ?? '–' : match.arceScore ?? '–'}</span><span className="display-title flex-1 text-right text-xl font-semibold uppercase">{match.home ? match.opponent : 'U.S. Arce'}</span></div></article>)}</div> : <div className="mt-7 border border-dashed border-slate-200 px-5 py-10 text-center"><Trophy className="mx-auto size-7 text-[#a97712]"/><p className="mt-3 font-display text-2xl font-semibold uppercase">Risultati in aggiornamento</p><p className="mt-2 text-xs leading-5 text-slate-500">I risultati ufficiali compariranno in questa sezione.</p></div>}
          </div>
        </div>
        <div className="mt-7 flex items-center gap-3 text-xs text-white/45"><span className="size-2 rounded-full bg-[#f2bd42]" /> Dati gestiti dalla società e aggiornati tramite area riservata <ArrowUpRight className="size-3 text-[#f2bd42]" /></div>
      </div>
    </section>
  )
}
