import { ALIAS } from '@/domain/core/constants'
import { isRight, unwrapEither } from '@/domain/core/either'
import type { DeleteLinkUseCase } from '@/domain/use-cases/delete-link-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const deleteLinkParamsSchema = z.object({
  alias: z.string().min(ALIAS.min_length).max(ALIAS.max_length),
})

export class DeleteLinkController {
  constructor(private deleteLinkUseCase: DeleteLinkUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { alias } = deleteLinkParamsSchema.parse(request.params)
    const result = await this.deleteLinkUseCase.execute({ alias })

    if (isRight(result)) {
      return reply.status(204).send()
    }

    const error = unwrapEither(result)

    switch (error.constructor.name) {
      case 'LinkNotFoundException':
        return reply.status(404).send({ message: error.message })
      case 'InvalidShortUrlException':
        return reply.status(400).send({ message: error.message })
      default:
        return reply
          .status(500)
          .send({ message: error.message || 'Internal server error' })
    }
  }
}
