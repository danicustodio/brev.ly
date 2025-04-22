import type { LinksRepository } from '../repositories/links-repository'
import type { Link } from '../entities/link'
import { isValidAlias } from '../core/utils/is-valid-alias'
import { InvalidShortUrlException } from '../core/exceptions/invalid-shorturl-format'
import { LinkNotFoundException } from '../core/exceptions/link-not-found-exception'
import { type Either, makeLeft, makeRight } from '../core/either'

interface GetShortUrlUseCaseRequest {
  alias: string
}

export type GetShortUrlUseCaseResponse = Either<
  InvalidShortUrlException | LinkNotFoundException,
  { link: Link }
>

/**
 * Use case for retrieving a shortened link by its alias and incrementing its access count.
 */
export class GetShortUrlUseCase {
  constructor(private linksRepository: LinksRepository) {}

  /**
   * Executes the use case.
   * @param request The request containing the alias.
   * @returns Either an error or the link.
   */
  async execute(
    request: GetShortUrlUseCaseRequest
  ): Promise<GetShortUrlUseCaseResponse> {
    const { alias } = request

    if (!isValidAlias(alias)) {
      return makeLeft(new InvalidShortUrlException())
    }

    const link = await this.linksRepository.findByAlias(alias)
    if (!link) {
      return makeLeft(new LinkNotFoundException(alias))
    }

    await this.linksRepository.incrementAccessCount(link.id)

    const updatedLink = await this.linksRepository.findByAlias(alias)

    if (!updatedLink) {
      return makeLeft(new LinkNotFoundException(alias))
    }

    return makeRight({ link: updatedLink })
  }
}
