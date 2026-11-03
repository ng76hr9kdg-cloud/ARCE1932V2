'use client'

import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, CalendarDays, Check, ImagePlus, LogOut, Newspaper, Plus, Save, ShieldCheck, Trash2, Users, Handshake } from 'lucide-react'

type NewsItem = { category: string; title: string; text: string; image: string }
type MatchItem = {
  date: string; time: string; opponent: string; home: boolean; competition: string; venue: string
  status: 'upcoming' | 'played'; arceScore: number | null; opponentScore: number | null
}
type SponsorItem = { name: string; category: string; website: string; logo: string }
type SiteContent = {
  news: NewsItem[]
  matches: MatchItem[]
  sponsors: SponsorItem[]
  contacts: { email: string; phone: string; address: string }
}
type Tab = 'news' | 'matches' | 'sponsors' | 'contacts'

const emptyContent: SiteContent = {
  news: [], matches: [], sponsors: [], contacts: { email: '', phone: '', address: 'Arce · Provincia di Frosinone' },
}

const inputClass = 'mt-2 w-full rounded-sm border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-[#b7831c] focus:ring-2 focus:ring-[#f2bd42]/25'
const labelClass = 'block text-[10px] font-extrabold uppercase tracking-[.14em] text-slate-500'
const buttonClass = 'inline-flex items-center justify-center gap-2 bg-[#08264b] px-4 py-3 text-[10px] font-black uppercase tracking-[.12em] text-white transition hover:bg-[#b7831c] disabled:cursor-not-allowed disabled:opacity-50'

function Field({ label, value, onChange, placeholder = '', type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: 'text' | 'password' | 'email' | 'date' | 'time' | 'number' }) {
  return <label className={labelClass}>{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={inputClass} /></label>
}

function TextAreaField({ label, value, onChange, placeholder = '' }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return <label className={labelClass}>{label}<textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={3} className={`${inputClass} resize-y`} /></label>
}

export function AdminContentEditor() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [content, setContent] = useState<SiteContent>(emptyContent)
  const [tab, setTab] = useState<Tab>('news')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadContent = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/content', { cache: 'no-store' })
      const result = await response.json()
      if (response.status === 401) { setAuthenticated(false); setError(''); return }
      if (!response.ok) throw new Error(result.error || 'Impossibile caricare i contenuti.')
      setContent(result.content as SiteContent)
      setAuthenticated(true)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Errore di connessione.')
      setAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadContent()
  }, [loadContent])

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Accesso non riuscito.')
      setPassword('')
      await loadContent()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Errore durante l’accesso.')
      setLoading(false)
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAuthenticated(false)
    setContent(emptyContent)
    setMessage('')
    setError('')
  }

  async function uploadImage(file: File, onUploaded: (path: string) => void) {
    setUploading(true)
    setError('')
    setMessage('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Caricamento immagine non riuscito.')
      onUploaded(result.path as string)
      setMessage('Immagine caricata. Il percorso è stato inserito nel contenuto: salva anche la scheda per pubblicarla sul sito.')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Errore durante il caricamento dell’immagine.')
    } finally {
      setUploading(false)
    }
  }

  async function saveContent() {
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Salvataggio non riuscito.')
      setMessage('Modifiche salvate su GitHub. Vercel avvierà automaticamente la pubblicazione del sito aggiornato.')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Errore durante il salvataggio.')
    } finally {
      setSaving(false)
    }
  }

  function updateNews<K extends keyof NewsItem>(index: number, key: K, value: NewsItem[K]) {
    setContent((current) => ({ ...current, news: current.news.map((item, i) => i === index ? { ...item, [key]: value } : item) }))
  }
  function updateMatch<K extends keyof MatchItem>(index: number, key: K, value: MatchItem[K]) {
    setContent((current) => ({ ...current, matches: current.matches.map((item, i) => i === index ? { ...item, [key]: value } : item) }))
  }
  function updateSponsor<K extends keyof SponsorItem>(index: number, key: K, value: SponsorItem[K]) {
    setContent((current) => ({ ...current, sponsors: current.sponsors.map((item, i) => i === index ? { ...item, [key]: value } : item) }))
  }

  const tabs: { id: Tab; label: string; icon: typeof Newspaper }[] = [
    { id: 'news', label: 'Notizie', icon: Newspaper },
    { id: 'matches', label: 'Partite', icon: CalendarDays },
    { id: 'sponsors', label: 'Sponsor', icon: Handshake },
    { id: 'contacts', label: 'Contatti', icon: Users },
  ]

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#061a32] px-4 py-12">
        <div className="w-full max-w-md border border-white/10 bg-white p-8 shadow-2xl sm:p-10">
          <div className="mx-auto flex size-14 items-center justify-center bg-[#f2bd42] text-[#071a32]"><ShieldCheck className="size-7" /></div>
          <p className="mt-6 text-center text-[10px] font-black uppercase tracking-[.25em] text-[#a97712]">U.S. Arce 1932</p>
          <h1 className="display-title mt-2 text-center text-4xl font-semibold uppercase text-[#071a32]">Area riservata</h1>
          <p className="mt-3 text-center text-sm leading-6 text-slate-500">Accedi per aggiornare notizie, calendario, sponsor e contatti del sito ufficiale.</p>
          <form onSubmit={login} className="mt-8">
            <label className={labelClass}>Password amministratore<input autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className={inputClass} placeholder="Inserisci la password" /></label>
            <button disabled={loading} className={`${buttonClass} mt-5 w-full py-4`}>{loading ? 'Accesso in corso…' : 'Accedi all’area riservata'}</button>
          </form>
          {error && <p role="alert" className="mt-5 border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <a href="/" className="mt-7 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-slate-400 hover:text-[#071a32]"><ArrowLeft className="size-3" /> Torna al sito</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f3f5f8]">
      <header className="bg-[#061a32] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-7">
          <div><p className="text-[9px] font-black uppercase tracking-[.25em] text-[#f2bd42]">U.S. Arce 1932</p><h1 className="display-title mt-1 text-3xl font-semibold uppercase sm:text-4xl">Gestione sito</h1></div>
          <div className="flex items-center gap-2"><a href="/" className="hidden items-center gap-2 border border-white/20 px-4 py-3 text-[9px] font-black uppercase tracking-[.12em] text-white hover:border-[#f2bd42] sm:inline-flex">Apri sito <ArrowUpRightIcon /></a><button onClick={logout} className="flex items-center gap-2 border border-white/20 px-3 py-3 text-[9px] font-black uppercase tracking-[.12em] text-white hover:border-[#f2bd42]"><LogOut className="size-4"/><span className="hidden sm:inline">Esci</span></button></div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-7 sm:py-10">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#a97712]">Pannello di controllo</p><h2 className="display-title mt-2 text-4xl font-semibold uppercase text-[#071a32]">I contenuti del club</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Modifica i contenuti, salva e lascia che Vercel pubblichi automaticamente la nuova versione.</p></div>
          <button onClick={saveContent} disabled={saving || loading} className={`${buttonClass} min-h-12 px-6`}><Save className="size-4"/>{saving ? 'Salvataggio…' : 'Salva e pubblica'}</button>
        </div>

        {message && <div role="status" className="mb-5 flex items-start gap-3 border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800"><Check className="mt-0.5 size-5 shrink-0"/>{message}</div>}
        {error && <div role="alert" className="mb-5 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">{error}</div>}

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Sezioni di gestione" className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {tabs.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setTab(id)} className={`flex shrink-0 items-center gap-3 px-4 py-4 text-left text-[10px] font-black uppercase tracking-[.12em] transition-colors ${tab === id ? 'bg-[#08264b] text-white' : 'bg-white text-slate-500 hover:bg-slate-100'}`}><Icon className={`size-4 ${tab === id ? 'text-[#f2bd42]' : ''}`}/>{label}</button>)}
          </nav>

          <section className="min-w-0 bg-white p-5 shadow-[0_12px_40px_rgba(7,26,50,.05)] sm:p-8">
            {tab === 'news' && <>
              <div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="display-title text-3xl font-semibold uppercase text-[#071a32]">Notizie e articoli</h3><p className="mt-1 text-xs text-slate-500">Gestisci i riquadri nella sezione Notizie della homepage.</p></div><button onClick={() => setContent((v) => ({ ...v, news: [...v.news, { category: 'Società', title: '', text: '', image: '/images/news-1.png' }] }))} className={buttonClass}><Plus className="size-4"/> Aggiungi notizia</button></div>
              <div className="mt-7 space-y-5">{content.news.map((item, index) => <article key={index} className="border border-slate-200 p-4 sm:p-5"><div className="mb-4 flex items-center justify-between"><span className="text-[9px] font-black uppercase tracking-[.18em] text-[#a97712]">Notizia {String(index + 1).padStart(2, '0')}</span><button onClick={() => setContent((v) => ({ ...v, news: v.news.filter((_, i) => i !== index) }))} aria-label="Elimina notizia" className="flex size-9 items-center justify-center border border-red-100 text-red-500 hover:bg-red-50"><Trash2 className="size-4"/></button></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Categoria" value={item.category} onChange={(v) => updateNews(index, 'category', v)}/><div className="space-y-2"><Field label="Percorso immagine" value={item.image} onChange={(v) => updateNews(index, 'image', v)} placeholder="/images/foto-notizia.jpg"/><label className={`${labelClass} block`}>Carica foto dal computer<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadImage(file, (path) => updateNews(index, 'image', path)); event.currentTarget.value = '' }} className="mt-2 block w-full text-xs font-medium normal-case tracking-normal text-slate-500 file:mr-3 file:border-0 file:bg-[#08264b] file:px-3 file:py-2 file:text-[9px] file:font-black file:uppercase file:tracking-wider file:text-white"/></label></div><div className="sm:col-span-2"><Field label="Titolo" value={item.title} onChange={(v) => updateNews(index, 'title', v)}/></div><div className="sm:col-span-2"><TextAreaField label="Testo breve" value={item.text} onChange={(v) => updateNews(index, 'text', v)}/></div></div><p className="mt-3 flex items-center gap-2 text-[10px] text-slate-400"><ImagePlus className="size-3.5"/> Puoi caricare una foto dal computer in JPG, PNG o WEBP (massimo 4 MB).</p></article>)}</div>
            </>}

            {tab === 'matches' && <>
              <div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="display-title text-3xl font-semibold uppercase text-[#071a32]">Calendario e risultati</h3><p className="mt-1 text-xs text-slate-500">Aggiungi una gara, indicando se deve apparire come prossima partita o risultato.</p></div><button onClick={() => setContent((v) => ({ ...v, matches: [...v.matches, { date: new Date().toISOString().slice(0, 10), time: '15:00', opponent: '', home: true, competition: '', venue: '', status: 'upcoming', arceScore: null, opponentScore: null }] }))} className={buttonClass}><Plus className="size-4"/> Aggiungi partita</button></div>
              <div className="mt-7 space-y-5">{content.matches.map((item, index) => <article key={index} className="border border-slate-200 p-4 sm:p-5"><div className="mb-4 flex items-center justify-between"><span className="text-[9px] font-black uppercase tracking-[.18em] text-[#a97712]">Partita {String(index + 1).padStart(2, '0')}</span><button onClick={() => setContent((v) => ({ ...v, matches: v.matches.filter((_, i) => i !== index) }))} aria-label="Elimina partita" className="flex size-9 items-center justify-center border border-red-100 text-red-500 hover:bg-red-50"><Trash2 className="size-4"/></button></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Avversario" value={item.opponent} onChange={(v) => updateMatch(index, 'opponent', v)} placeholder="Nome squadra"/><label className={labelClass}>Stato<select value={item.status} onChange={(e) => updateMatch(index, 'status', e.target.value as MatchItem['status'])} className={inputClass}><option value="upcoming">Prossima partita</option><option value="played">Risultato finale</option></select></label><Field label="Data" type="date" value={item.date} onChange={(v) => updateMatch(index, 'date', v)}/><Field label="Orario" type="time" value={item.time} onChange={(v) => updateMatch(index, 'time', v)}/><label className={labelClass}>Sede<select value={item.home ? 'home' : 'away'} onChange={(e) => updateMatch(index, 'home', e.target.value === 'home')} className={inputClass}><option value="home">In casa · Arce</option><option value="away">In trasferta</option></select></label><Field label="Competizione" value={item.competition} onChange={(v) => updateMatch(index, 'competition', v)}/><div className="sm:col-span-2"><Field label="Impianto / località" value={item.venue} onChange={(v) => updateMatch(index, 'venue', v)}/></div><Field label="Gol Arce (lascia vuoto se da giocare)" value={item.arceScore === null ? '' : String(item.arceScore)} onChange={(v) => updateMatch(index, 'arceScore', v === '' ? null : Number(v))} type="number"/><Field label="Gol avversari (lascia vuoto se da giocare)" value={item.opponentScore === null ? '' : String(item.opponentScore)} onChange={(v) => updateMatch(index, 'opponentScore', v === '' ? null : Number(v))} type="number"/></div></article>)}</div>
              {content.matches.length === 0 && <div className="mt-7 border border-dashed border-slate-300 p-10 text-center"><CalendarDays className="mx-auto size-8 text-[#b7831c]"/><p className="mt-3 text-sm font-semibold text-[#071a32]">Nessuna partita inserita</p><p className="mt-1 text-xs text-slate-500">Aggiungi le gare ufficiali per mostrarle sul sito.</p></div>}
            </>}

            {tab === 'sponsors' && <>
              <div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="display-title text-3xl font-semibold uppercase text-[#071a32]">Partner e sponsor</h3><p className="mt-1 text-xs text-slate-500">Pubblica i partner ufficiali della società.</p></div><button onClick={() => setContent((v) => ({ ...v, sponsors: [...v.sponsors, { name: '', category: 'Partner', website: '', logo: '' }] }))} className={buttonClass}><Plus className="size-4"/> Aggiungi sponsor</button></div>
              <div className="mt-7 space-y-5">{content.sponsors.map((item, index) => <article key={index} className="border border-slate-200 p-4 sm:p-5"><div className="mb-4 flex items-center justify-between"><span className="text-[9px] font-black uppercase tracking-[.18em] text-[#a97712]">Partner {String(index + 1).padStart(2, '0')}</span><button onClick={() => setContent((v) => ({ ...v, sponsors: v.sponsors.filter((_, i) => i !== index) }))} aria-label="Elimina sponsor" className="flex size-9 items-center justify-center border border-red-100 text-red-500 hover:bg-red-50"><Trash2 className="size-4"/></button></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Nome azienda" value={item.name} onChange={(v) => updateSponsor(index, 'name', v)}/><Field label="Tipologia" value={item.category} onChange={(v) => updateSponsor(index, 'category', v)} placeholder="Main sponsor, partner..."/><Field label="Sito web" value={item.website} onChange={(v) => updateSponsor(index, 'website', v)} placeholder="https://..."/><div className="space-y-2"><Field label="Percorso logo" value={item.logo} onChange={(v) => updateSponsor(index, 'logo', v)} placeholder="/images/sponsor-logo.png"/><label className={`${labelClass} block`}>Carica logo dal computer<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) void uploadImage(file, (path) => updateSponsor(index, 'logo', path)); event.currentTarget.value = '' }} className="mt-2 block w-full text-xs font-medium normal-case tracking-normal text-slate-500 file:mr-3 file:border-0 file:bg-[#08264b] file:px-3 file:py-2 file:text-[9px] file:font-black file:uppercase file:tracking-wider file:text-white"/></label></div></div></article>)}</div>
              {content.sponsors.length === 0 && <div className="mt-7 border border-dashed border-slate-300 p-10 text-center"><Handshake className="mx-auto size-8 text-[#b7831c]"/><p className="mt-3 text-sm font-semibold text-[#071a32]">Ancora nessun partner inserito</p><p className="mt-1 text-xs text-slate-500">Aggiungi i nomi degli sponsor ufficiali e i relativi loghi.</p></div>}
            </>}

            {tab === 'contacts' && <>
              <h3 className="display-title text-3xl font-semibold uppercase text-[#071a32]">Contatti della società</h3><p className="mt-1 text-xs text-slate-500">Inserisci soltanto recapiti ufficiali che possono essere pubblicati online.</p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="Email" value={content.contacts.email} onChange={(v) => setContent((c) => ({ ...c, contacts: { ...c.contacts, email: v } }))} placeholder="info@..." type="email"/><Field label="Telefono" value={content.contacts.phone} onChange={(v) => setContent((c) => ({ ...c, contacts: { ...c.contacts, phone: v } }))} placeholder="+39 ..."/><div className="sm:col-span-2"><Field label="Indirizzo / località" value={content.contacts.address} onChange={(v) => setContent((c) => ({ ...c, contacts: { ...c.contacts, address: v } }))} placeholder="Arce (FR)"/></div></div>
            </>}

            <div className="mt-9 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-lg text-[10px] leading-5 text-slate-400">Il salvataggio crea un aggiornamento nel repository GitHub. Vercel riceve il commit e avvia la nuova pubblicazione. Le modifiche possono richiedere alcuni minuti per comparire sul sito.</p><button onClick={saveContent} disabled={saving} className={`${buttonClass} min-h-12 shrink-0 px-6`}><Save className="size-4"/>{saving ? 'Salvataggio…' : 'Salva contenuti'}</button></div>
          </section>
        </div>
      </div>
    </main>
  )
}

function ArrowUpRightIcon() {
  return <span aria-hidden="true">↗</span>
}
