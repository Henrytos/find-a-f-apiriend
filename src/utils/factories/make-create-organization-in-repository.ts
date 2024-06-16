import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { faker } from '@faker-js/faker'
import { hash } from "bcrypt";

interface makeCreateOrganizationParams {
    password: string
    email: string
}

export async function makeCreateOrganizationInRepository({
    password,
    email
}: makeCreateOrganizationParams) {
    await prisma.organization.create({
        data: {
            manager_name: faker.person.firstName(),
            email,
            password_hash: await hash(password, 6),
            city: faker.location.city(),
            neighborhood: faker.location.country(),
            number: faker.location.buildingNumber(),
            phone: faker.phone.number(),
            roadway: faker.location.country(),
            state: faker.location.state(),
        }
    })
}