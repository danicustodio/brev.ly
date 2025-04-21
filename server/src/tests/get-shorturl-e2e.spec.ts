import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/infra/http/app'
import { DrizzleLinksRepository } from '@/infra/repositories/drizzle/drizzle-links-repository'
import type { LinksRepository } from '@/domain/repositories/links-repository'
import { Link } from '@/domain/entities/link'
import { generateUniqueAlias } from './utils/generate-unique-alias'
import { closeDatabase } from '@/infra/database'
import { env } from '@/env'
import type { LinkHttp } from '@/infra/http/presenters/link-presenter'

describe('E2E - Get Short URL', () => {
  let linksRepository: LinksRepository

  beforeAll(async () => {
    await app.ready()
    linksRepository = new DrizzleLinksRepository()
  })

  afterAll(async () => {
    await app.close()
    await closeDatabase()
  })

  it('should return link and increment access count on each request', async () => {
    const alias = generateUniqueAlias()
    const link = new Link({ url: 'http://example.com', alias })
    await linksRepository.create(link)

    const res1 = await request(app.server).get(`/links/${alias}`)
    const link1: LinkHttp = res1.body
    expect(res1.status).toBe(200)
    expect(link1.shortUrl).toBe(`${env.BREVLY_BASE_URL}/${alias}`)
    expect(link1.accessCount).toBe(1)

    const res2 = await request(app.server).get(`/links/${alias}`)
    expect(res2.status).toBe(200)
    expect(res2.body.accessCount).toBe(2)
  })
})
