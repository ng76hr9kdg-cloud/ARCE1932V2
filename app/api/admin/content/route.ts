import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-auth'
import { readRepositoryContent, writeRepositoryContent } from '@/lib/github-content'
import { validateSiteContent } from '@/lib/validate-site-content'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function authorized(request: NextRequest) {
  return isValidAdminSession(request.cookies.get(ADMIN_COOKIE)?.value)
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: 'Sessione scaduta. Accedi di nuovo.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } })
  try {
    const result = await readRepositoryContent()
    return NextResponse.json({ content: result.content }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Errore durante la lettura dei contenuti.' }, { status: 500, headers: { 'Cache-Control': 'no-store' } })
  }
}

export async function PUT(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: 'Sessione scaduta. Accedi di nuovo.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } })
  let content: unknown
  try { content = await request.json() } catch { return NextResponse.json({ error: 'Il contenuto inviato non è un JSON valido.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } }) }
  if (!validateSiteContent(content)) return NextResponse.json({ error: 'Alcuni campi non sono validi. Controlla i dati e riprova.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } })
  try {
    const result = await writeRepositoryContent(content)
    return NextResponse.json({ ok: true, commitUrl: result.commitUrl }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Errore durante il salvataggio.' }, { status: 500, headers: { 'Cache-Control': 'no-store' } })
  }
}
