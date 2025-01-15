import { prisma } from "@/lib/prisma"
import { OrganizationRepository } from "../organization-repository"
import { randomUUID } from "crypto"
import { Prisma } from "@prisma/client"
import { findByOrganizationByEmailAndPasswordParams } from "../organization-repository"
import { compare, hash } from "bcrypt"

export class PrismaOrganizationRepository implements OrganizationRepository {

    async findManyOrganizationByCityName(city: string) {
        const organizationOfACity = await prisma.organization.findMany({
            where: {
                city,

            }
        })
        if (organizationOfACity.length === 0) {
            return null
        }
        return organizationOfACity
    }

    async create(organization: Prisma.OrganizationCreateInput) {
        const newOrganization = await prisma.organization.create({
            data: {
                id: organization.id ?? randomUUID(),
                manager_name: organization.manager_name,
                city: organization.city,
                email: organization.email,
                password_hash: await hash(organization.password_hash, 6),
                neighborhood: organization.neighborhood,
                number: organization.number,
                phone: organization.phone,
                roadway: organization.roadway,
                state: organization.state,
                role: "ORG",
            }
        })

        return newOrganization

    }

    async findByOrganizationId(id: string) {
        const organization = await prisma.organization.findUnique({
            where: {
                id,
            }
        })

        return organization
    }

    async findByOrganizationByEmailAndPassword({ email, password }: findByOrganizationByEmailAndPasswordParams) {
        const organization = await prisma.organization.findFirst({
            where: {
                email,
            }
        })

        console.log({organization})

        if (!organization) {
            return null
        }

        const isValidatePassword = await compare(password, organization.password_hash)

        if (!isValidatePassword) {
            return null
        }

        return organization
    }

    async findByOrganizationEmail(email: string) {
        const organization = await prisma.organization.findFirst({
            where: {
                email,
            }
        })
        if (!organization) {
            return null
        }
        return organization
    }

}
