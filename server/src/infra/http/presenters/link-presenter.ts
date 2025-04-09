import { env } from '@/env'
import type { Link } from '@/domain/entities/link'

function toHTTP(link: Link) {
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
