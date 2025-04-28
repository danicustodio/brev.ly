import type { FastifyRequest, FastifyReply } from 'fastify'
import type { ExportLinksUseCase } from '@/domain/use-cases/export-links-use-case'
import { isRight } from '@/domain/core/either'
import { z } from 'zod'

const exportLinksQuerySchema = z.object({
  search: z.string().optional(),
})

export type ExportLinksQuery = z.infer<typeof exportLinksQuerySchema>

/**
 * HTTP controller for exporting links as CSV.
 */
export class ExportLinksController {
  constructor(private exportLinksUseCase: ExportLinksUseCase) {}

  async handle(
    request: FastifyRequest<{ Querystring: ExportLinksQuery }>,
    reply: FastifyReply
  ) {
    const { search: searchQuery } = exportLinksQuerySchema.parse(request.query)

    const result = await this.exportLinksUseCase.execute({
      searchQuery,
    })

    if (isRight(result)) {
      return reply.status(200).send({
        url: result.right.url,
      })
    }
  }
}
