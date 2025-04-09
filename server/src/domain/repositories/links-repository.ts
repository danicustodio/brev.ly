import type { Link } from '../entities/link'

export interface LinksRepository {
  create(link: Link): Promise<Link>
  findByAlias(alias: string): Promise<Link | null>
  findAll(): Promise<Link[]>
  delete(id: string): Promise<void>
  incrementAccessCount(id: string): Promise<void>
}
