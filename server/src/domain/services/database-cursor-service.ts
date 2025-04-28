import type { Readable } from 'node:stream'

export interface DatabaseCursorService {
  createCursor(sql: string, params: unknown[], batchSize: number): Readable
}
