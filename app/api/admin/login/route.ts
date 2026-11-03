import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, ADMIN_SESSION_SECONDS, createAdminSession, safeStringEqual } from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const configuredPassword = process.env.ADMIN_PASSWORD
  if (!configuredPassword || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: 'Area amministrativa non ancora configurata su Vercel.' }, { status: 503 })
  }
  let body: { password?: string }
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Richiesta non valida.' }, { status: 400 }) }
  if (typeof body.password !== 'string' || !safeStringEqual(body.password, configuredPassword)) {
    return NextResponse.json({ error: 'Password non corretta.' }, { status: 401 })
  }
  const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_SECONDS
  const response = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
  response.cookies.set(ADMIN_COOKIE, createAdminSession(expiresAt), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: ADMIN_SESSION_SECONDS,
  })
  return response
}
