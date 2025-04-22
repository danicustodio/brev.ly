import { env } from '@/env'
import type { Link } from '@/domain/entities/link'
import { z } from 'zod'

export const linkHttpSchema = z.object({
  id: z.string().uuid(),
  alias: z.string(),
  url: z.string().url(),
  accessCount: z.number(),
  createdAt: z.date(),
  shortUrl: z.string().url(),
})

export type LinkHttp = z.infer<typeof linkHttpSchema>

function toHTTP(link: Link): LinkHttp {
  const { id, url, alias, createdAt, accessCount } = link

  return {
    id,
    alias,
    url,
    accessCount,
    createdAt,
    shortUrl: `${env.BREVLY_BASE_URL}/${alias}`,
  }
}

export const linkPresenter = {
  toHTTP,
}
