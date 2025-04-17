import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/infra/http/app'
import { Link } from '@/domain/entities/link'
import { env } from '@/env'
import { generateUniqueAlias } from './utils/generate-unique-alias'
import { closeDatabase } from '@/infra/database'

describe('E2E - Create Link', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
    await closeDatabase()
  })

  it('should create a link successfully', async () => {
    const link = new Link({
      url: 'http://google.com',
      alias: generateUniqueAlias(),
    })

    const response = await request(app.server).post('/links').send({
      url: link.url,
      alias: link.alias,
    })

    expect(response.status).toBe(201)
    expect(response.body.shortUrl).toBe(`${env.BREVLY_BASE_URL}/${link.alias}`)
  })
})
