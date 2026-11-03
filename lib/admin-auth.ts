import { createHmac, timingSafeEqual } from 'node:crypto'

export const ADMIN_COOKIE = 'usarce_admin_session'
export const ADMIN_SESSION_SECONDS = 60 * 60 * 8

export function createAdminSession(expiresAt: number) {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET non configurato')
  const payload = String(expiresAt)
  const signature = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${signature}`
}

export function isValidAdminSession(value?: string) {
  if (!value || !process.env.ADMIN_SESSION_SECRET) return false
  const [expiresRaw, signature, extra] = value.split('.')
  if (!expiresRaw || !signature || extra) return false
  const expiresAt = Number(expiresRaw)
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false
  const expected = createHmac('sha256', process.env.ADMIN_SESSION_SECRET).update(expiresRaw).digest('base64url')
  const receivedBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer)
}

export function safeStringEqual(left: string, right: string) {
  const a = Buffer.from(left)
  const b = Buffer.from(right)
  return a.length === b.length && timingSafeEqual(a, b)
}
