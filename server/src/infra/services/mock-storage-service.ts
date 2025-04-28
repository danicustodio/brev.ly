import type { Readable } from 'node:stream'
import { env } from '@/env'
import type { StorageService } from '@/domain/services/storage-service'

export class MockStorageService implements StorageService {
  async uploadFile(
    fileName: string,
    contentType: string,
    content: Readable
  ): Promise<{ url: string }> {
    for await (const _ of content) {
      // Do nothing with the chunks, just consume the stream
    }

    const url = `${env.BREVLY_BASE_URL}/storage/${fileName}`

    return { url }
  }
}
