import { Organization, Prisma } from "@prisma/client";



export interface OrganizationRepository {
    create(organization: Prisma.OrganizationCreateInput): Promise<Organization>
    findById(id: string): Promise<Organization[]>
    findByCityName(cityName: string): Promise<Organization[]>
}