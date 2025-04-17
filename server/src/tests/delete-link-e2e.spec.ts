import { app } from '@/infra/http/app'
import { it, afterAll, beforeAll, describe, expect } from 'vitest'
import request from 'supertest'
import { generateUniqueAlias } from './utils/generate-unique-alias'
import { Link } from '@/domain/entities/link'
import { DrizzleLinksRepository } from '@/infra/repositories/drizzle/drizzle-links-repository'
import type { LinksRepository } from '@/domain/repositories/links-repository'
import { closeDatabase } from '@/infra/database'

describe('E2E - Delete Link', () => {
  let linksRepository: LinksRepository

  beforeAll(async () => {
    await app.ready()
    linksRepository = new DrizzleLinksRepository()
  })

  afterAll(async () => {
    await app.close()
    await closeDatabase()
  })

  it('should delete an existing link and return 204', async () => {
    const link = new Link({
      url: 'http://google.com',
      alias: generateUniqueAlias(),
    })
    await linksRepository.create(link)

    const response = await request(app.server).delete(`/links/${link.alias}`)
    expect(response.status).toBe(204)
  })

  it('should return 404 when deleting a non-existing link', async () => {
    const alias = 'nonexistent'

    const response = await request(app.server).delete(`/links/${alias}`)
    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      message: `Link with alias "${alias}" not found`,
    })
  })
})
