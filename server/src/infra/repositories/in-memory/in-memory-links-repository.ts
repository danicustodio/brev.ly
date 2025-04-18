import type { Link } from '@/domain/entities/link'
import type { LinksRepository } from '@/domain/repositories/links-repository'

export class InMemoryLinksRepository implements LinksRepository {
  private items: Link[] = []

  async create(link: Link): Promise<Link> {
    this.items.push(link)
    return link
  }

  async findByAlias(alias: string): Promise<Link | null> {
    const link = this.items.find(item => item.alias === alias)
    return link ?? null
  }

  async findAll(): Promise<Link[]> {
    return this.items
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === id)

    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1)
    }
  }

  async incrementAccessCount(id: string): Promise<void> {
    const link = this.items.find(item => item.id === id)

    if (link) {
      link.incrementAccessCount()
    }
  }
}
