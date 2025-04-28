import type { Transform } from 'node:stream'
import { stringify } from 'csv-stringify'
import type { CSVService } from '@/domain/services/csv-service'

export class NodeCSVService implements CSVService {
  createCSV(columns: Array<{ key: string; header: string }>): Transform {
    return stringify({
      delimiter: ',',
      header: true,
      columns,
    })
  }
}
