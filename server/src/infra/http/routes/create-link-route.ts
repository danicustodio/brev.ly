import { CreateLinkUseCase } from '@/domain/use-cases/create-link-use-case'
import {
  createLinkBodySchema,
  CreateLinkController,
} from '../controllers/create-link-controller'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { DrizzleLinksRepository } from '@/infra/repositories/drizzle/drizzle-links-repository'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create Link',
        tags: ['links'],
        body: createLinkBodySchema,
        response: {
          201: z.object({
            id: z.string().uuid(),
            url: z.string().url(),
            accessCount: z.number(),
            createdAt: z.date(),
            shortUrl: z.string().url(),
          }),
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
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const linksRepository = new DrizzleLinksRepository()
      const createLinkUseCase = new CreateLinkUseCase(linksRepository)
      const createLinkController = new CreateLinkController(createLinkUseCase)

      await createLinkController.handle(request, reply)
    }
  )
}
