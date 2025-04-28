import { Readable } from 'node:stream'
import { pg } from '@/infra/database'
import type { DatabaseCursorService } from '@/domain/services/database-cursor-service'
import type { LinkProps } from '@/domain/entities/link'

export type LinkCSVRow = Required<LinkProps>
export class PostgresCursorService implements DatabaseCursorService {
  createCursor(sql: string, params: unknown[], batchSize: number): Readable {
    const cursor = pg
      .unsafe<LinkCSVRow[]>(sql, params as string[])
      .cursor(batchSize)
    return Readable.from(cursor, { objectMode: true })
  }
}
