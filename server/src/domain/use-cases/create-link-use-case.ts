import { Link } from '../entities/link'
import type { LinksRepository } from '../repositories/links-repository'
import { InvalidUrlException } from '../core/exceptions/invalid-url-exception'
import { InvalidShortUrlException } from '../core/exceptions/invalid-shorturl-format'
import { type Either, makeLeft, makeRight } from '../core/either'
import { DuplicatedShortUrlException } from '../core/exceptions/duplicated-shorturl'
import { isValidAlias } from '../core/utils/is-valid-alias'

interface CreateLinkUseCaseRequest {
  url: string
  alias: string
}

type CreateLinkUseCaseResponse = Either<
  InvalidShortUrlException | InvalidUrlException | DuplicatedShortUrlException,
  { link: Link }
>

export class CreateLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  private isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  async execute({
    url,
    alias,
  }: CreateLinkUseCaseRequest): Promise<CreateLinkUseCaseResponse> {
    if (!this.isValidUrl(url)) {
      return makeLeft(new InvalidUrlException())
    }

    if (!isValidAlias(alias)) {
      return makeLeft(new InvalidShortUrlException())
    }

    const existingLink = await this.linksRepository.findByAlias(alias)
    if (existingLink) {
      return makeLeft(new DuplicatedShortUrlException())
    }

    const link = new Link({
      url,
      alias,
    })
    const savedLink = await this.linksRepository.create(link)
    return makeRight({ link: savedLink })
  }
}
