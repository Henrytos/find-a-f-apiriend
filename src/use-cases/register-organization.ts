import { OrganizationRepository } from "@/repository/organization-repository";
import { getAddressByZipCode } from "@/utils/get-address-by-zip-code";
import { Organization } from "@prisma/client";
import { hash } from "bcrypt";

interface RegisterOrganizationUseCaseRequest {
    manager_name: string
    email: string
    password: string
    phone: string,
    number: string
    zipCode: string
}

interface RegisterOrganizationUseCaseResponse {
    organization: Organization
}

export class RegisterOrganizationUseCase {

    constructor(private organizationRepository: OrganizationRepository) { }

    async execute({ manager_name, email, password, phone, number, zipCode }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {

        const { city, neighborhood, state, roadway } = await getAddressByZipCode(zipCode)

        try {
            const organization = await this.organizationRepository.create({
                manager_name,
                email,
                phone,
                password_hash: password,
                city,
                neighborhood,
                state,
                number,
                roadway
            })

            return { organization }
        } catch (error) {
            throw Error
        }

    }
}