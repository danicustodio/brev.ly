import { describe, it, expect, beforeEach } from 'vitest'
import { GetShortUrlUseCase } from './get-shorturl'
import { MockLinksRepository } from '@/domain/mocks/repositories/mock-links-repository'
import { isLeft, isRight } from '../core/either'
import { InvalidShortUrlException } from '../core/exceptions/invalid-shorturl-format'
import { LinkNotFoundException } from '../core/exceptions/link-not-found-exception'
import { Link } from '../entities/link'
import type { LinksRepository } from '../repositories/links-repository'

describe('Get ShortUrl Use Case', () => {
  let linksRepository: LinksRepository
  let sut: GetShortUrlUseCase

  beforeEach(() => {
    linksRepository = new MockLinksRepository()
    sut = new GetShortUrlUseCase(linksRepository)
  })

  it('should return the link and increment access count on success', async () => {
    const alias = 'myalias'
    const link = new Link({
      url: 'http://example.com',
      alias,
    })
    await linksRepository.create(link)

    const result = await sut.execute({ alias })
    expect(isRight(result)).toBe(true)
    if (isRight(result)) {
      const returnedLink = result.right.link
      expect(returnedLink).toBe(link)
      expect(returnedLink.accessCount).toBe(1)
    }
  })

  it('should return InvalidShortUrlException for invalid alias', async () => {
    const result = await sut.execute({ alias: 'ab' })
    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(InvalidShortUrlException)
    }
  })

  it('should return LinkNotFoundException for non-existing alias', async () => {
    const alias = 'unknown123'
    const result = await sut.execute({ alias })
    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(LinkNotFoundException)
    }
  })
})
