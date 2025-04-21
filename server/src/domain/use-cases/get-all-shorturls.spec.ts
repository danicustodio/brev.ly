import { describe, it, expect, beforeEach } from 'vitest'
import { GetAllShortUrlsUseCase } from './get-all-shorturls'
import { InMemoryLinksRepository } from '@/infra/repositories/in-memory/in-memory-links-repository'
import { Link } from '../entities/link'
import type { LinksRepository } from '../repositories/links-repository'

describe('Get All ShortUrls Use Case', () => {
  let linksRepository: LinksRepository
  let sut: GetAllShortUrlsUseCase

  beforeEach(() => {
    linksRepository = new InMemoryLinksRepository()
    sut = new GetAllShortUrlsUseCase(linksRepository)
  })

  it('should return an empty list when there are no links', async () => {
    const result = await sut.execute()
    expect(result.links).toEqual([])
  })

  it('should return all links in the repository', async () => {
    const link1 = new Link({ url: 'http://example.com', alias: 'alias1' })
    const link2 = new Link({ url: 'http://example.org', alias: 'alias2' })
    await linksRepository.create(link1)
    await linksRepository.create(link2)

    const result = await sut.execute()

    expect(result.links).toHaveLength(2)
    expect(result.links[0]).toBe(link1)
    expect(result.links[1]).toBe(link2)
  })
})
