import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import type { LinksRepository } from '../repositories/links-repository'
import { type Either, makeRight } from '@/domain/core/either'
import type { StorageService } from '@/domain/services/storage-service'
import type { DatabaseCursorService } from '@/domain/services/database-cursor-service'
import type { CSVService } from '@/domain/services/csv-service'
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
    private CSVService: CSVService,
    private storageService: StorageService
  ) {}

  private readonly columns: Array<{ key: string; header: string }> = [
    { key: 'url', header: 'Original URL' },
    { key: 'alias', header: 'Short URL' },
    { key: 'access_count', header: 'Access Count' },
    { key: 'created_at', header: 'Creation Date' },
  ]

  private oneByOneTransform = () => {
    return new Transform({
      objectMode: true,
      transform(chunks: Link[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }
        callback()
      },
    })
  }

  private formatDateForFilename = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  async execute({
    searchQuery,
  }: ExportLinksUseCaseRequest): Promise<
    Either<never, ExportLinksUseCaseResponse>
  > {
    const { sql, params } = await this.linksRepository.findAllSQL(searchQuery)

    const cursor = this.databaseCursorService.createCursor(
      sql,
      params,
      BATCH_SIZE
    )

    const uploadToStorageStream = new PassThrough()

    const csv = this.CSVService.createCSV(this.columns)

    const csvToStorageMainStreamPipepline = pipeline(
      cursor,
      this.oneByOneTransform(),
      csv,
      uploadToStorageStream
    )

    const fileName = `${this.formatDateForFilename(new Date())}.csv`

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
