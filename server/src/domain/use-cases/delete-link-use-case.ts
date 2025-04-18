import { type Either, makeLeft, makeRight } from '../core/either'
import { LinkNotFoundException } from '../core/exceptions/link-not-found-exception'
import { InvalidShortUrlException } from '../core/exceptions/invalid-shorturl-format'
import type { LinksRepository } from '../repositories/links-repository'
import { isValidAlias } from '../core/utils/is-valid-alias'

interface DeleteLinkUseCaseRequest {
  alias: string
}

export type DeleteLinkUseCaseResponse = Either<
  LinkNotFoundException | InvalidShortUrlException,
  null
>

export class DeleteLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    alias,
  }: DeleteLinkUseCaseRequest): Promise<DeleteLinkUseCaseResponse> {
    if (!isValidAlias(alias)) {
      return makeLeft(new InvalidShortUrlException())
    }

    const existingLink = await this.linksRepository.findByAlias(alias)

    if (!existingLink) {
      return makeLeft(new LinkNotFoundException(alias))
    }

    await this.linksRepository.delete(existingLink.id)
    return makeRight(null)
  }
}
