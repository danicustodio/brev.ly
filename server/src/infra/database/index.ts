import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { schema } from './schemas'
import { env } from '@/env'

export const pg = postgres(env.DATABASE_URL, {
  max: 10,
  idle_timeout: 20,
})
export const db = drizzle(pg, { schema })
export const closeDatabase = async () => {
  await pg.end()
}
