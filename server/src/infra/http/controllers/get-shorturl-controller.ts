import { isRight, unwrapEither } from '@/domain/core/either'
import { ALIAS } from '@/domain/core/constants'
import type { GetShortUrlUseCase } from '@/domain/use-cases/get-shorturl'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { linkPresenter } from '../presenters/link-presenter'
import { z } from 'zod'

export const getShortUrlParamsSchema = z.object({
  alias: z.string().min(ALIAS.min_length).max(ALIAS.max_length),
})

/**
 * HTTP controller for retrieving a shortened link by alias and incrementing its access count.
 */
export class GetShortUrlController {
  constructor(private getShortUrlUseCase: GetShortUrlUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { alias } = getShortUrlParamsSchema.parse(request.params)
    const result = await this.getShortUrlUseCase.execute({ alias })

    if (isRight(result)) {
      const { link } = unwrapEither(result)
      return reply.status(200).send(linkPresenter.toHTTP(link))
    }

    const error = unwrapEither(result)
    switch (error.constructor.name) {
      case 'InvalidShortUrlException':
        return reply.status(400).send({ message: error.message })
      case 'LinkNotFoundException':
        return reply.status(404).send({ message: error.message })
      default:
        return reply
          .status(500)
          .send({ message: error.message || 'Internal server error' })
    }
  }
}
