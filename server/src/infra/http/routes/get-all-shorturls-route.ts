import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { GetAllShortUrlsController } from '../controllers/get-all-shorturls-controller'
import { GetAllShortUrlsUseCase } from '@/domain/use-cases/get-all-shorturls-use-case'
import { DrizzleLinksRepository } from '@/infra/repositories/drizzle/drizzle-links-repository'
import { linkHttpSchema } from '../presenters/link-presenter'

/**
 * Route for listing all shortened links.
 */
export const getAllShortUrlsRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'List all shortened links',
        tags: ['links'],
        response: {
          200: z.array(linkHttpSchema),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const linksRepository = new DrizzleLinksRepository()
      const useCase = new GetAllShortUrlsUseCase(linksRepository)
      const controller = new GetAllShortUrlsController(useCase)
      await controller.handle(request, reply)
    }
  )
}
