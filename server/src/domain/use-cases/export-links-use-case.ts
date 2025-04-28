import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import type { LinksRepository } from '../repositories/links-repository'
import { type Either, makeRight } from '@/domain/core/either'
import type { StorageService } from '@/domain/services/storage-service'
import type { DatabaseCursorService } from '@/domain/services/database-cursor-service'
import type { CSVExportService } from '@/domain/services/csv-export-service'
import { env } from 'node:process'
import type { Link } from '../entities/link'

const BATCH_SIZE = 50
interface ExportLinksUseCaseRequest {
  searchQuery?: string
}

type ExportLinksUseCaseResponse = {
  url: string
}

export class ExportLinksUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private databaseCursorService: DatabaseCursorService,
    private csvExportService: CSVExportService,
    private storageService: StorageService
  ) {
    this.transformLinkToCSVRow = this.transformLinkToCSVRow.bind(this)
    this.oneByOneTransform = this.oneByOneTransform.bind(this)
  }

  private transformLinkToCSVRow(link: Link) {
    return {
      ...link,
      short_url: `${env.BREVLY_BASE_URL}/${link.alias}`,
    }
  }

  private oneByOneTransform() {
    const self = this

    return new Transform({
      objectMode: true,
      transform(chunks: Link[], encoding, callback) {
        for (const chunk of chunks) {
          const data = self.transformLinkToCSVRow(chunk)
          this.push(data)
        }
        callback()
      },
    })
  }

  async execute({
    searchQuery,
  }: ExportLinksUseCaseRequest): Promise<
    Either<never, ExportLinksUseCaseResponse>
  > {
    const { sql, params } = await this.linksRepository.findAllSQL(searchQuery)

    const columns = [
      { key: 'url', header: 'Original URL' },
      { key: 'short_url', header: 'Short URL' },
      { key: 'access_count', header: 'Access Count' },
      { key: 'created_at', header: 'Creation Date' },
    ]

    const cursor = this.databaseCursorService.createCursor(
      sql,
      params,
      BATCH_SIZE
    )

    const uploadToStorageStream = new PassThrough()

    const csv = this.csvExportService.createCSV(columns)

    const csvToStorageMainStreamPipepline = pipeline(
      cursor,
      this.oneByOneTransform(),
      csv,
      uploadToStorageStream
    )

    const fileName = `${new Date().toISOString()}.csv`

    const uploadToStorage = this.storageService.uploadFile({
      fileName,
      contentType: 'text/csv',
      content: uploadToStorageStream,
    })

    const [{ url }] = await Promise.all([
      uploadToStorage,
      csvToStorageMainStreamPipepline,
    ])

    return makeRight({ url })
  }
}
