import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, isValidAdminSession } from '@/lib/admin-auth'
import { uploadRepositoryImage } from '@/lib/github-content'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  if (!isValidAdminSession(request.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Sessione scaduta. Accedi di nuovo.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } })
  }
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    if (!(file instanceof File)) return NextResponse.json({ error: 'Seleziona un’immagine da caricare.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } })
    const result = await uploadRepositoryImage(file)
    return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Errore durante il caricamento dell’immagine.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } })
  }
}
