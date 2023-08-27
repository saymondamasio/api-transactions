import { config } from 'dotenv'

import { z } from 'zod'

if (process.env.NODE_ENV) {
  config({ path: `.env.${process.env.NODE_ENV}` })
} else {
  config()
}

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']).default('sqlite'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
