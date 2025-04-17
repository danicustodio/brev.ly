import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import {
  DeleteLinkController,
  deleteLinkParamsSchema,
} from '../controllers/delete-link-controller'
import { DrizzleLinksRepository } from '@/infra/repositories/drizzle/drizzle-links-repository'
import { DeleteLinkUseCase } from '@/domain/use-cases/delete-link-use-case'
import { z } from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/links/:alias',
    {
      schema: {
        summary: 'Delete Link',
        description: 'Deletes a shortened link by its alias identifier',
        tags: ['links'],
        params: deleteLinkParamsSchema,
        response: {
          204: z.null(),
          400: z.object({
            message: z.string(),
            issues: z
              .array(
                z.object({
                  keyword: z.string(),
                  message: z.string(),
                })
              )
              .optional(),
          }),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const linksRepository = new DrizzleLinksRepository()
      const deleteLinkUseCase = new DeleteLinkUseCase(linksRepository)
      const deleteController = new DeleteLinkController(deleteLinkUseCase)

      await deleteController.handle(request, reply)
    }
  )
}
