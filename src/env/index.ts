import "dotenv/config"
import { z } from 'zod'

const schema = z.object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.coerce.string(),
    JWT_SECRET_KEY: z.coerce.string(),
    FRONT_END_URL: z.coerce.string().default('http://localhost:3000'),
})

const _env = schema.safeParse(process.env)

if (_env.success == false) {
    console.log(`Error parsing env: ${_env.error.format()}`)
    throw new Error('Error parsing env')
}

export const env = schema.parse(process.env)