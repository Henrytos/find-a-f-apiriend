import { Organization, Prisma } from "@prisma/client";
import { OrganizationRepository } from "../organization-repository";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
export class InMemoryOrganizationRepository implements OrganizationRepository {
    public items: Organization[] = []

    async findManyOrganizationByCityName(cityName: string) {
        const organizationOfACity = this.items.filter(item => item.city === cityName)
        if (organizationOfACity.length === 0) {
            return null
        }
        return organizationOfACity
    }

    async create(organization: Prisma.OrganizationCreateInput) {
        const newOrganization: Organization = {
            id: organization.id ?? randomUUID(),
            manager_name: organization.manager_name,
            address: organization.address,
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
        this.items.push(
            newOrganization
        )
        return newOrganization

    }

    async findByOrganizationId(id: string) {
        const organization = this.items.find(item => item.id === id)
        if (!organization) {
            return null
        }
        return organization
    }

}