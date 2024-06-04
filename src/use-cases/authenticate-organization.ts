import { OrganizationRepository } from "@/repository/organization-repository";
import { Organization } from "@prisma/client";
import { NotFoundOrganizationError } from "./errors/not-found-organization";

interface AuthenticateOrganizationUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateOrganizationUseCaseResponse {
    organization: Organization
}

export class AuthenticateOrganizationUseCase {
    constructor(private organizationRepository: OrganizationRepository) { }

    async execute({ email, password }: AuthenticateOrganizationUseCaseRequest): Promise<AuthenticateOrganizationUseCaseResponse> {
        const organization = await this.organizationRepository.findByOrganizationByEmailAndPassword({ email, password });

        if (!organization) {
            throw new NotFoundOrganizationError()
        }

        return {
            organization
        };
    }
}
