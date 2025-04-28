import type { Transform } from 'node:stream'
import { stringify } from 'csv-stringify'
import type { CSVExportService } from '@/domain/services/csv-export-service'

export class NodeCSVExportService implements CSVExportService {
  createCSV(columns: Array<{ key: string; header: string }>): Transform {
    return stringify({
      delimiter: ',',
      header: true,
      columns,
    })
  }
}
