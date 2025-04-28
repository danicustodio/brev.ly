import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ExportLinksUseCase } from './export-links-use-case'
import { InMemoryLinksRepository } from '@/infra/repositories/in-memory/in-memory-links-repository'
import { isRight } from '@/domain/core/either'
import { Readable, Transform } from 'node:stream'
import type { DatabaseCursorService } from '@/domain/services/database-cursor-service'
import type { CSVExportService } from '@/domain/services/csv-export-service'
import type { StorageService } from '@/domain/services/storage-service'

class MockCursor extends Readable {
  constructor() {
    super({ objectMode: true })
    this.push([
      {
        url: 'https://example.com',
        alias: 'example',
        accessCount: 10,
        createdAt: new Date(),
      },
    ])
    this.push(null)
  }
}

class MockDatabaseCursorService implements DatabaseCursorService {
  createCursor(): Readable {
    return new MockCursor()
  }
}

class MockCSVExportService implements CSVExportService {
  createCSV(columns: Array<{ key: string; header: string }>): Transform {
    const transform = new Transform({
      objectMode: true,
      transform(chunk, encoding, callback) {
        const csvRow = `${columns.map(col => chunk[col.key]).join(',')}\n`
        callback(null, csvRow)
      },
    })
    return transform
  }
}

class MockStorageService implements StorageService {
  async uploadFile(): Promise<{ url: string }> {
    return { url: 'https://example.com/storage/test.csv' }
  }
}

describe('Export Links Use Case', () => {
  let linksRepository: InMemoryLinksRepository
  let databaseCursorService: MockDatabaseCursorService
  let csvExportService: MockCSVExportService
  let storageService: MockStorageService
  let sut: ExportLinksUseCase

  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    databaseCursorService = new MockDatabaseCursorService()
    csvExportService = new MockCSVExportService()
    storageService = new MockStorageService()

    sut = new ExportLinksUseCase(
      linksRepository,
      databaseCursorService,
      csvExportService,
      storageService
    )
  })

  it('should export links to CSV and return the report URL', async () => {
    const result = await sut.execute({})

    expect(isRight(result)).toBe(true)

    if (isRight(result)) {
      expect(result.right.url).toEqual('https://example.com/storage/test.csv')
    }
  })

  it('should export links with search query', async () => {
    const spy = vi.spyOn(linksRepository, 'findAllSQL')

    await sut.execute({ searchQuery: 'test' })

    expect(spy).toHaveBeenCalledWith('test')
  })
})
