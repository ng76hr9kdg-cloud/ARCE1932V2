import { randomBytes } from 'node:crypto'

const FILE_PATH = 'content/site-content.json'

function getConfig() {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'
  if (!token || !owner || !repo) {
    throw new Error('Configurazione GitHub incompleta: servono GITHUB_TOKEN, GITHUB_OWNER e GITHUB_REPO.')
  }
  return { token, owner, repo, branch }
}

function headers(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'usarce1932-content-manager',
  }
}

export async function readRepositoryContent() {
  const { token, owner, repo, branch } = getConfig()
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${FILE_PATH}?ref=${encodeURIComponent(branch)}`
  const response = await fetch(url, { headers: headers(token), cache: 'no-store' })
  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Lettura da GitHub non riuscita (${response.status}): ${detail.slice(0, 300)}`)
  }
  const file = await response.json()
  const decoded = Buffer.from(String(file.content || '').replace(/\n/g, ''), 'base64').toString('utf8')
  return { content: JSON.parse(decoded), sha: String(file.sha || '') }
}

export async function writeRepositoryContent(content: unknown) {
  const { token, owner, repo, branch } = getConfig()
  const current = await readRepositoryContent()
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${FILE_PATH}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Aggiorna contenuti sito US Arce 1932',
      content: Buffer.from(`${JSON.stringify(content, null, 2)}\n`, 'utf8').toString('base64'),
      sha: current.sha,
      branch,
    }),
    cache: 'no-store',
  })
  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Salvataggio su GitHub non riuscito (${response.status}): ${detail.slice(0, 400)}`)
  }
  const result = await response.json()
  return { commitUrl: result.commit?.html_url as string | undefined }
}


export async function uploadRepositoryImage(file: File) {
  const { token, owner, repo, branch } = getConfig()
  const mimeToExtension: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }
  const extension = mimeToExtension[file.type]
  if (!extension) throw new Error('Formato non supportato. Usa JPG, PNG o WEBP.')
  if (file.size <= 0 || file.size > 4 * 1024 * 1024) throw new Error('L’immagine deve pesare al massimo 4 MB.')

  const bytes = Buffer.from(await file.arrayBuffer())
  const isJpeg = bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
  const isPng = bytes.length > 8 && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  const isWebp = bytes.length > 12 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP'
  if (!(isJpeg || isPng || isWebp)) throw new Error('Il file non sembra essere un’immagine JPG, PNG o WEBP valida.')

  const safeBase = file.name.replace(/\.[^.]+$/, '').normalize('NFKD').replace(/[^a-zA-Z0-9-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 36) || 'foto'
  const filename = `${Date.now()}-${randomBytes(3).toString('hex')}-${safeBase}.${extension}`
  const path = `public/images/${filename}`
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  const response = await fetch(url, {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Aggiunge immagine sito: ${filename}`,
      content: bytes.toString('base64'),
      branch,
    }),
    cache: 'no-store',
  })
  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Caricamento immagine non riuscito (${response.status}): ${detail.slice(0, 300)}`)
  }
  return { path: `/images/${filename}` }
}
