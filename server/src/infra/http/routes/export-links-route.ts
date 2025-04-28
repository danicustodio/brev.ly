import { ExportLinksUseCase } from '@/domain/use-cases/export-links-use-case'
import { DrizzleLinksRepository } from '@/infra/repositories/drizzle/drizzle-links-repository'
import { PostgresCursorService } from '@/infra/services/postgres-cursor-service'
import { NodeCSVExportService } from '@/infra/services/node-csv-export-service'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import {
  ExportLinksController,
  type ExportLinksQuery,
} from '../controllers/export-links-controller'
import type { FastifyRequest } from 'fastify'
import { R2StorageService } from '@/infra/services/r2-storage-service'

export const exportLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/export',
    {
      schema: {
        summary: 'Export CSV with links',
        description: 'Exports all the links in a CSV format',
        tags: ['links'],
        querystring: z.object({
          search: z.string().optional(),
        }),
        response: {
          200: z.object({
            url: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (
      request: FastifyRequest<{ Querystring: ExportLinksQuery }>,
      reply
    ) => {
      const linksRepository = new DrizzleLinksRepository()
      const databaseCursorService = new PostgresCursorService()
      const csvExportService = new NodeCSVExportService()
      const storageService = new R2StorageService()

      const exportLinksUseCase = new ExportLinksUseCase(
        linksRepository,
        databaseCursorService,
        csvExportService,
        storageService
      )

      const exportLinksController = new ExportLinksController(
        exportLinksUseCase
      )

      await exportLinksController.handle(request, reply)
    }
  )
}
