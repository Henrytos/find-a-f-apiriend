import 'dotenv/config'
import { PrismaClient } from "@prisma/client";

console.log(process.env.NODE_ENV)

export const prisma = new PrismaClient({
    log: process.env.NODE_ENV != 'test' ? ['query'] : []
})