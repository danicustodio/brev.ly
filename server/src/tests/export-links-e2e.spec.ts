import { closeDatabase } from '@/infra/database'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { MockStorageService } from '@/domain/mocks/services/mock-storage-service'
import { NodeCSVService } from '@/infra/services/node-csv-export-service'

vi.mock('@/infra/services/r2-storage-service', () => {
  return {
    R2StorageService: MockStorageService,
  }
})

import { app } from '@/infra/http/app'
import request from 'supertest'

describe('E2E - Export All Links', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
    await closeDatabase()
  })

  it('should return a URL for the CSV download', async () => {
    const csvSpy = vi.spyOn(NodeCSVService.prototype, 'createCSV')

    const response = await request(app.server).get('/links/export')

    expect(response.status).toBe(200)
    expect(csvSpy).toHaveBeenCalledOnce()
    expect(response.body.url).toBeDefined()
  })
})
