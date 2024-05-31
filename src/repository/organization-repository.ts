import { Organization, Prisma } from "@prisma/client";



export interface OrganizationRepository {
    create(organization: Prisma.OrganizationCreateInput): Promise<Organization>
    findManyOrganizationId(id: string): Promise<Organization[]>
    findManyOrganizationByCityName(cityName: string): Promise<Organization[] | null>
}