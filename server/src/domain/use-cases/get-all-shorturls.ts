import type { LinksRepository } from '../repositories/links-repository'
import type { Link } from '../entities/link'

/**
 * Use case for listing all shortened links.
 */
export class GetAllShortUrlsUseCase {
  constructor(private linksRepository: LinksRepository) {}

  /**
   * Executes the use case.
   * @returns An object containing all links.
   */
  async execute(): Promise<{ links: Link[] }> {
    const links = await this.linksRepository.findAll()
    return { links }
  }
}
