import { pgTable, uuid, integer, timestamp, text } from 'drizzle-orm/pg-core'

export const links = pgTable('links', {
  id: uuid('id').primaryKey(),
  url: text('url').notNull(),
  alias: text('alias').notNull().unique(),
  accessCount: integer('access_count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type LinkRow = typeof links.$inferSelect
export type NewLinkRow = typeof links.$inferInsert
