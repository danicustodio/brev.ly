import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/infra/http/app'
import { DrizzleLinksRepository } from '@/infra/repositories/drizzle/drizzle-links-repository'
import type { LinksRepository } from '@/domain/repositories/links-repository'
import { Link } from '@/domain/entities/link'
import { generateUniqueAlias } from './utils/generate-unique-alias'
import { closeDatabase, db } from '@/infra/database'
import { env } from '@/env'
import { sql } from 'drizzle-orm'
import type { LinkHttp } from '@/infra/http/presenters/link-presenter'

describe('E2E - List All Short URLs', () => {
  let linksRepository: LinksRepository

  beforeAll(async () => {
    await app.ready()
    linksRepository = new DrizzleLinksRepository()
    // Clean up any existing links
    await db.execute(sql`TRUNCATE TABLE links`)
  })

  afterAll(async () => {
    await app.close()
    await closeDatabase()
  })

  it('should return all links in the repository', async () => {
    const alias1 = generateUniqueAlias()
    const alias2 = generateUniqueAlias()
    const link1 = new Link({ url: 'http://example.com', alias: alias1 })
    const link2 = new Link({ url: 'http://example.org', alias: alias2 })
    await linksRepository.create(link1)
    await linksRepository.create(link2)

    const response = await request(app.server).get('/links')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    // Verify both links are present
    const urls = response.body.map((item: LinkHttp) => item.shortUrl)
    expect(urls).toContain(`${env.BREVLY_BASE_URL}/${alias1}`)
    expect(urls).toContain(`${env.BREVLY_BASE_URL}/${alias2}`)
  })
})
