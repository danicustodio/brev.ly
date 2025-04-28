import { env } from '@/env'
import type {
  StorageService,
  UploadFileInput,
  UploadFileOutput,
} from '@/domain/services/storage-service'

export class MockStorageService implements StorageService {
  async uploadFile(props: UploadFileInput): Promise<UploadFileOutput> {
    const { content, fileName } = props

    for await (const _ of content) {
      // Do nothing with the chunks, just consume the stream
    }

    const url = `${env.BREVLY_BASE_URL}/storage/${fileName}`

    return { url }
  }
}
