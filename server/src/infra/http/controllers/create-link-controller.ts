import { isRight, unwrapEither } from '@/domain/core/either'
import type { CreateLinkUseCase } from '@/domain/use-cases/create-link-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { linkPresenter } from '../presenters/link-presenter'
import { ALIAS } from '@/domain/core/constants'

export const createLinkBodySchema = z.object({
  url: z.string().url(),
  alias: z.string().min(ALIAS.min_length).max(ALIAS.max_length),
})

export class CreateLinkController {
  constructor(private createLinkUseCase: CreateLinkUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { url, alias } = createLinkBodySchema.parse(request.body)

    const result = await this.createLinkUseCase.execute({
      url,
      alias,
    })

    if (isRight(result)) {
      const { link } = unwrapEither(result)
      return reply.status(201).send(linkPresenter.toHTTP(link))
    }

    const error = unwrapEither(result)

    switch (error.constructor.name) {
      case 'InvalidShortUrlException':
      case 'InvalidUrlException':
      case 'DuplicatedShortUrlException':
        return reply.status(400).send({ message: error.message })
      default:
        return reply
          .status(500)
          .send({ message: error.message || 'Internal Server Error' })
    }
  }
}
