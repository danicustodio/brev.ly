import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { server } from '@/infra/http/server'
import { Link } from '@/domain/entities/link'
import { env } from '@/env'
import { generateUniqueAlias } from './utils/generate-unique-alias'

describe('E2E - Create Link', () => {
  beforeAll(async () => {
    await server.ready()
  })

  afterAll(async () => {
    await server.close()
  })

  it('should create a link successfully', async () => {
    const link = new Link({
      url: 'http://google.com',
      alias: generateUniqueAlias(),
    })

    const response = await request(server.server).post('/links').send({
      url: link.url,
      alias: link.alias,
    })

    expect(response.status).toBe(201)
    expect(response.body.shortUrl).toBe(`${env.BREVLY_BASE_URL}/${link.alias}`)
  })
})
