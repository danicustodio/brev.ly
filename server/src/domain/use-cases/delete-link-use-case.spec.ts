import { describe, it, expect, beforeEach } from 'vitest'
import { DeleteLinkUseCase } from './delete-link-use-case'
import { MockLinksRepository } from '@/domain/mocks/repositories/mock-links-repository'
import { isLeft, isRight } from '../core/either'
import { LinkNotFoundException } from '../core/exceptions/link-not-found-exception'
import { InvalidShortUrlException } from '../core/exceptions/invalid-shorturl-format'
import { Link } from '../entities/link'
import { ALIAS } from '../core/constants'

describe('Delete Link Use Case', () => {
  let linksRepository: MockLinksRepository
  let sut: DeleteLinkUseCase

  beforeEach(() => {
    linksRepository = new MockLinksRepository()
    sut = new DeleteLinkUseCase(linksRepository)
  })

  it('should delete an existing link', async () => {
    const link = new Link({ url: 'https://example.com', alias: 'alias' })
    await linksRepository.create(link)

    const result = await sut.execute({ alias: link.alias })

    expect(isRight(result)).toBe(true)

    const found = await linksRepository.findByAlias(link.alias)
    expect(found).toBeNull()
  })

  it('should return LinkNotFoundException when alias does not exist', async () => {
    const missingAlias = 'nonexistent'

    const result = await sut.execute({ alias: missingAlias })

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(LinkNotFoundException)
      expect(result.left.message).toBe(
        `Link with alias "${missingAlias}" not found`
      )
    }
  })

  it('should return InvalidShortUrlException when alias is too short', async () => {
    const shortAlias = 'a'.repeat(ALIAS.min_length - 1)

    const result = await sut.execute({ alias: shortAlias })

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(InvalidShortUrlException)
    }
  })

  it('should return InvalidShortUrlException when alias is too long', async () => {
    const longAlias = 'a'.repeat(ALIAS.max_length + 1)

    const result = await sut.execute({ alias: longAlias })

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(InvalidShortUrlException)
    }
  })

  it('should return InvalidShortUrlException when alias contains invalid characters', async () => {
    const invalidAlias = 'alias!@#'

    const result = await sut.execute({ alias: invalidAlias })

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(InvalidShortUrlException)
    }
  })
})
