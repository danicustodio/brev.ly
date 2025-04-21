import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import {
  GetShortUrlController,
  getShortUrlParamsSchema,
} from '../controllers/get-shorturl-controller'
import { GetShortUrlUseCase } from '@/domain/use-cases/get-shorturl'
import { DrizzleLinksRepository } from '@/infra/repositories/drizzle/drizzle-links-repository'
import { linkHttpSchema } from '../presenters/link-presenter'

/**
 * Route for retrieving a shortened link by alias and incrementing its access count.
 */
export const getShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/:alias',
    {
      schema: {
        summary: 'Get a shortened link by alias',
        tags: ['links'],
        params: getShortUrlParamsSchema,
        response: {
          200: linkHttpSchema,
          400: z.object({
            message: z.string(),
            issues: z
              .array(z.object({ keyword: z.string(), message: z.string() }))
              .optional(),
          }),
          404: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const linksRepository = new DrizzleLinksRepository()
      const useCase = new GetShortUrlUseCase(linksRepository)
      const controller = new GetShortUrlController(useCase)
      await controller.handle(request, reply)
    }
  )
}
