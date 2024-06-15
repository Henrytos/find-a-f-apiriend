import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest'
import 'dotenv/config'

// DATABASE_URL = 'postgres://docker:docker@localhost:5432/api?schema=postgres'

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('please inform the DATABASE_URL environment variable')
    }

    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set('schema', schema)
    return url.toString()

}


export default <Environment>{
    name: 'custom',
    transformMode: 'ssr',
    setup() {
        const schema = randomUUID()
        const databaseUrl = generateDatabaseUrl(schema)

        process.env.DATABASE_URL = databaseUrl
        execSync(`npx prisma migrate deploy`)
        console.log('DATABASE_URL', process.env.DATABASE_URL)
        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
                await prisma.$disconnect()
                console.log('DELETE SCHEMA TEST ENVIRONMENT')
            }
        }
    }
}