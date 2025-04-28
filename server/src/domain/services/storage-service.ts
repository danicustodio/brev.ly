import type { Readable } from 'node:stream'

export interface UploadFileInput {
  fileName: string
  folder?: string
  contentType: string
  content: Readable
}

export interface UploadFileOutput {
  url: string
}
export interface StorageService {
  uploadFile(props: UploadFileInput): Promise<UploadFileOutput>
}
