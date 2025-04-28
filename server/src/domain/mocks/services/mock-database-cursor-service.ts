import type { DatabaseCursorService } from '@/domain/services/database-cursor-service'
import { Readable } from 'node:stream'

export class MockCursor extends Readable {
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

export class MockDatabaseCursorService implements DatabaseCursorService {
  createCursor(): Readable {
    return new MockCursor()
  }
}
