import type { Link } from '../entities/link'
export interface LinksRepository {
  create(link: Link): Promise<Link>
  findByAlias(alias: string): Promise<Link | null>
  findAll(): Promise<Link[]>
  findAllSQL(searchQuery?: string): Promise<{ sql: string; params: unknown[] }>
  delete(id: string): Promise<void>
  incrementAccessCount(id: string): Promise<void>
}
