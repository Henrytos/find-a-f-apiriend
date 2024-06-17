import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { faker } from '@faker-js/faker'
import { hash } from "bcrypt";
import { randomUUID } from "node:crypto";

interface makeCreateOrganizationParams extends Partial<Prisma.OrganizationCreateInput> {
    password: string
    email: string
}

export async function makeCreateOrganizationInRepository({
    password,
    email,
    ...props
}: makeCreateOrganizationParams) {
    const organization = await prisma.organization.create({
        data: {
            id: randomUUID(),
            manager_name: faker.person.firstName(),
            email,
            password_hash: await hash(password, 6),
            city: faker.location.city(),
            neighborhood: faker.location.country(),
            number: faker.location.buildingNumber(),
            phone: faker.phone.number(),
            roadway: faker.location.country(),
            state: faker.location.state(),
            role: "ORG",
            ...props
        }
    })
    return { organization }
}