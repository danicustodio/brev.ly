import { env } from '@/env'
import type { Config } from 'drizzle-kit'

export default {
  schema: 'src/infra/database/schemas/*',
  out: 'src/infra/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config
