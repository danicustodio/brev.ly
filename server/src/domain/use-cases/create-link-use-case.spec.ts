import { describe, it, expect, beforeEach } from 'vitest'
import { CreateLinkUseCase } from './create-link-use-case'
import { InMemoryLinksRepository } from '@/infra/repositories/in-memory/in-memory-links-repository'
import { isLeft, isRight } from '../core/either'
import { InvalidUrlException } from '../core/exceptions/invalid-url-exception'
import { InvalidShortUrlException } from '../core/exceptions/invalid-shorturl-format'
import { DuplicatedShortUrlException } from '../core/exceptions/duplicated-shorturl'

describe('Create Link Use Case', () => {
  let linksRepository: InMemoryLinksRepository
  let sut: CreateLinkUseCase

  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    sut = new CreateLinkUseCase(linksRepository)
  })

  it('should be able to create a link with a custom alias', async () => {
    const result = await sut.execute({
      url: 'https://google.com',
      alias: 'custom',
    })

    expect(isRight(result)).toBe(true)
  })

  it('should not be able to create a link with an invalid URL', async () => {
    const result = await sut.execute({
      url: 'invalid-url',
      alias: 'custom',
    })

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(InvalidUrlException)
    }
  })

  it('should not be able to create a link with an existing short URL', async () => {
    await sut.execute({
      url: 'https://example.com',
      alias: 'existing',
    })

    const result = await sut.execute({
      url: 'https://another-example.com',
      alias: 'existing',
    })

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(DuplicatedShortUrlException)
    }
  })

  it('should validate alias length between 3 and 32 characters', async () => {
    const tooShort = await sut.execute({
      url: 'https://example.com',
      alias: 'ab',
    })

    const tooLong = await sut.execute({
      url: 'https://example.com',
      alias: 'a'.repeat(33),
    })

    expect(isLeft(tooShort)).toBe(true)
    expect(isLeft(tooLong)).toBe(true)
  })

  it('should only allow alphanumeric characters and hyphens in alias', async () => {
    const result = await sut.execute({
      url: 'https://example.com',
      alias: 'test@123',
    })

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(InvalidShortUrlException)
    }
  })
})
