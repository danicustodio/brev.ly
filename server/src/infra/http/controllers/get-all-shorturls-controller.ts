import type { GetAllShortUrlsUseCase } from '@/domain/use-cases/get-all-shorturls-use-case'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { linkPresenter } from '../presenters/link-presenter'

/**
 * HTTP controller for listing all shortened links.
 */
export class GetAllShortUrlsController {
  constructor(private getAllShortUrlsUseCase: GetAllShortUrlsUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { links } = await this.getAllShortUrlsUseCase.execute()
    const httpLinks = links.map(linkPresenter.toHTTP)
    return reply.status(200).send(httpLinks)
  }
}
