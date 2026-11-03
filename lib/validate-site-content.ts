export type NewsItem = { category: string; title: string; text: string; image: string }
export type MatchItem = {
  date: string
  time: string
  opponent: string
  home: boolean
  competition: string
  venue: string
  status: 'upcoming' | 'played'
  arceScore: number | null
  opponentScore: number | null
}
export type SponsorItem = { name: string; category: string; website: string; logo: string }
export type SiteContent = {
  news: NewsItem[]
  matches: MatchItem[]
  sponsors: SponsorItem[]
  contacts: { email: string; phone: string; address: string }
}

function isText(value: unknown, max = 500): value is string {
  return typeof value === 'string' && value.length <= max
}

function isLocalImage(value: unknown) {
  return typeof value === 'string' && (value === '' || (value.startsWith('/images/') && !value.includes('..')))
}

export function validateSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== 'object') return false
  const content = value as Record<string, unknown>
  if (!Array.isArray(content.news) || !Array.isArray(content.matches) || !Array.isArray(content.sponsors)) return false
  if (!content.contacts || typeof content.contacts !== 'object') return false
  if (content.news.length > 40 || content.matches.length > 80 || content.sponsors.length > 40) return false

  const validNews = content.news.every((entry) => {
    if (!entry || typeof entry !== 'object') return false
    const item = entry as Record<string, unknown>
    return isText(item.category, 80) && isText(item.title, 160) && isText(item.text, 700) && isLocalImage(item.image)
  })
  const validMatches = content.matches.every((entry) => {
    if (!entry || typeof entry !== 'object') return false
    const item = entry as Record<string, unknown>
    return isText(item.date, 10) && /^\d{4}-\d{2}-\d{2}$/.test(String(item.date)) &&
      isText(item.time, 10) && isText(item.opponent, 100) && item.opponent !== '' &&
      typeof item.home === 'boolean' && isText(item.competition, 100) && isText(item.venue, 140) &&
      (item.time === '' || /^([01]\d|2[0-3]):[0-5]\d$/.test(String(item.time))) &&
      (item.status === 'upcoming' || item.status === 'played') &&
      (item.status !== 'played' || (Number.isInteger(item.arceScore) && Number.isInteger(item.opponentScore))) &&
      (item.arceScore === null || (Number.isInteger(item.arceScore) && Number(item.arceScore) >= 0 && Number(item.arceScore) <= 99)) &&
      (item.opponentScore === null || (Number.isInteger(item.opponentScore) && Number(item.opponentScore) >= 0 && Number(item.opponentScore) <= 99))
  })
  const validSponsors = content.sponsors.every((entry) => {
    if (!entry || typeof entry !== 'object') return false
    const item = entry as Record<string, unknown>
    return isText(item.name, 100) && item.name !== '' && isText(item.category, 80) && isText(item.website, 240) && (item.website === '' || /^https?:\/\//i.test(item.website)) && isLocalImage(item.logo)
  })
  const contacts = content.contacts as Record<string, unknown>
  const validContacts = isText(contacts.email, 180) && (contacts.email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacts.email)) && isText(contacts.phone, 60) && isText(contacts.address, 180)
  return validNews && validMatches && validSponsors && validContacts
}
