import type { Transform } from 'node:stream'

export interface CSVService {
  createCSV(columns: Array<{ key: string; header: string }>): Transform
}
