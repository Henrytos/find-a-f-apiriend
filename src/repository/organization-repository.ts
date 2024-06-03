import { Organization, Prisma } from "@prisma/client";


export interface findByOrganizationByEmailAndPasswordParams{
    email:string
    password:string
}

export interface OrganizationRepository {
    create(organization: Prisma.OrganizationCreateInput): Promise<Organization>
    findManyOrganizationByCityName(cityName: string): Promise<Organization[] | null>
    findByOrganizationId(id: string): Promise<Organization | null>
    findByOrganizationByEmailAndPassword({ email, password }:findByOrganizationByEmailAndPasswordParams): Promise<Organization | null>
}
