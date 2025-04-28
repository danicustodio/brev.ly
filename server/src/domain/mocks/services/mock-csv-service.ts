import type { CSVService } from '@/domain/services/csv-service'
import { Transform } from 'node:stream'

export class MockCSVService implements CSVService {
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
