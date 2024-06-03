import "dotenv/config"
import { z } from 'zod'

const schema = z.object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.coerce.string(),

})

const _env = schema.safeParse(process.env)

if (_env.success == false) {
    console.log(`Error parsing env: ${_env.error.format()}`)
    throw new Error('Error parsing env')
}

export const env = schema.parse(process.env)