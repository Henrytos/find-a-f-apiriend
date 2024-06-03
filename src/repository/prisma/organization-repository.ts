import { prisma } from "@/lib/prisma"
import { OrganizationRepository } from "../organization-repository"
import { randomUUID } from "crypto"
import { Prisma } from "@prisma/client"
import { findByOrganizationByEmailAndPasswordParams } from "organization-repository"

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
                password_hash: organization.password_hash,
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

    async findByOrganizationByEmailAndPassword({email, password}:findByOrganizationByEmailAndPasswordParams){
        const organization =  awaiit prisma.organization.findFirst({
            where:{
                email,
            }
        })
        
        const isValidatePassword = await compare(organization.password_hash,password)

        if(!isValidatePassword){
            return null
        }
        
        return organization              
    }

}
