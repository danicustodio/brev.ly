import { Link } from '@/domain/entities/link'
import type { LinksRepository } from '@/domain/repositories/links-repository'
import { db } from '@/infra/database'
import { schema } from '@/infra/database/schemas'
import type { LinkRow } from '@/infra/database/schemas/links'
import { eq } from 'drizzle-orm'

export class DrizzleLinksRepository implements LinksRepository {
  async create(link: Link): Promise<Link> {
    await db.insert(schema.links).values({
      id: link.id,
      url: link.url,
      alias: link.alias,
      accessCount: link.accessCount,
      createdAt: link.createdAt,
    })

    return link
  }

  async findByAlias(alias: string): Promise<Link | null> {
    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.alias, alias))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    const linkData = result[0]

    return new Link(
      {
        url: linkData.url,
        alias: linkData.alias,
        accessCount: linkData.accessCount,
        createdAt: linkData.createdAt,
      },
      linkData.id
    )
  }

  async findAll(): Promise<Link[]> {
    const result = await db.select().from(schema.links)

    return result.map(
      (linkData: LinkRow) =>
        new Link(
          {
            url: linkData.url,
            alias: linkData.alias,
            accessCount: linkData.accessCount,
            createdAt: linkData.createdAt,
          },
          linkData.id
        )
    )
  }

  async delete(id: string): Promise<void> {
    await db.delete(schema.links).where(eq(schema.links.id, id))
  }

  async incrementAccessCount(id: string): Promise<void> {
    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.id, id))
      .limit(1)

    if (result.length === 0) {
      return
    }

    const linkData = result[0]
    const newAccessCount = linkData.accessCount + 1

    await db
      .update(schema.links)
      .set({ accessCount: newAccessCount })
      .where(eq(schema.links.id, id))
  }
}
