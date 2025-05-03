import { client } from './axiosClient'
import {
  type CreateLinkDto,
  type Link,
  type LinkExport,
  linkSchema,
  linksArraySchema,
  linksExportSchema,
} from './types'

export const linkServices = {
  getAll: async (): Promise<Link[]> => {
    const response = await client.get('/links')
    return linksArraySchema.parse(response.data)
  },
  getByAlias: async (alias: string): Promise<Link> => {
    const response = await client.get(`/links/${alias}`)
    return linkSchema.parse(response.data)
  },
  create: async (data: CreateLinkDto): Promise<Link> => {
    const response = await client.post('/links', data)
    return linkSchema.parse(response.data)
  },
  delete: async (alias: string): Promise<void> => {
    await client.delete(`/links/${alias}`)
  },
  exportCSV: async (): Promise<LinkExport> => {
    const response = await client.get('/links/export')
    return linksExportSchema.parse(response.data)
  },
}
