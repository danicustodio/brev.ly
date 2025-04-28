import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ExportLinksUseCase } from './export-links-use-case'
import { MockLinksRepository } from '@/domain/mocks/repositories/mock-links-repository'
import { isRight } from '@/domain/core/either'
import type { DatabaseCursorService } from '@/domain/services/database-cursor-service'
import type { CSVService } from '@/domain/services/csv-service'
import type { StorageService } from '@/domain/services/storage-service'
import { MockDatabaseCursorService } from '../mocks/services/mock-database-cursor-service'
import type { LinksRepository } from '../repositories/links-repository'
import { MockCSVService } from '../mocks/services/mock-csv-service'
import { MockStorageService } from '../mocks/services/mock-storage-service'
import { env } from '@/env'

describe('Export Links Use Case', () => {
  let linksRepository: LinksRepository
  let databaseCursorService: DatabaseCursorService
  let CSVService: CSVService
  let storageService: StorageService
  let sut: ExportLinksUseCase

  beforeEach(() => {
    linksRepository = new MockLinksRepository()
    databaseCursorService = new MockDatabaseCursorService()
    CSVService = new MockCSVService()
    storageService = new MockStorageService()

    sut = new ExportLinksUseCase(
      linksRepository,
      databaseCursorService,
      CSVService,
      storageService
    )
  })

  it('should export links to CSV and return the report URL', async () => {
    const fixedDate = new Date('2025-04-28T12:00:00Z')
    vi.setSystemTime(fixedDate)

    const result = await sut.execute({})

    expect(isRight(result)).toBe(true)

    if (isRight(result)) {
      expect(result.right.url).toEqual(
        `${env.BREVLY_BASE_URL}/storage/2025-04-28.csv`
      )
    }
  })

  it('should export links with search query', async () => {
    const spy = vi.spyOn(linksRepository, 'findAllSQL')

    await sut.execute({ searchQuery: 'test' })

    expect(spy).toHaveBeenCalledWith('test')
  })
})
