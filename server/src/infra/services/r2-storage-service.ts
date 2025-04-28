import type {
  StorageService,
  UploadFileInput,
  UploadFileOutput,
} from '@/domain/services/storage-service'

import { env } from '@/env'
import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { uuidv7 } from 'uuidv7'

export class R2StorageService implements StorageService {
  private generateUniqueName(fileName: string, folder?: string) {
    const directory = folder ? `${folder}/` : ''

    const uniqueFileName = `${directory}${uuidv7()}-${fileName}`

    return uniqueFileName
  }

  async uploadFile(input: UploadFileInput): Promise<UploadFileOutput> {
    const { fileName, folder, contentType, content } = input

    const uniqueFileName = this.generateUniqueName(fileName, folder)

    const r2 = new S3Client({
      region: 'auto',
      endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
      },
    })

    const upload = new Upload({
      client: r2,
      params: {
        Key: uniqueFileName,
        Bucket: env.CLOUDFLARE_BUCKET,
        Body: content,
        ContentType: contentType,
      },
    })

    await upload.done()

    return {
      url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
    }
  }
}
