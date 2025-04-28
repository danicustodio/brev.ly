import type { Transform } from 'node:stream'

export interface CSVExportService {
  createCSV(columns: Array<{ key: string; header: string }>): Transform
}
