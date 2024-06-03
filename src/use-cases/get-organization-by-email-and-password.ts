import { OrganizationRepository } from "@/repository/organization-repository";
import { Organization } from "@prisma/client";
import { NotFoundOrganizationError } from "./errors/not-found-organization";

interface GetOrganizationByEmailAndPasswordUseCaseRequest {
    email: string
    password: string
}

interface GetOrganizationByEmailAndPasswordUseCaseResponse {
    organization: Organization
}

export class GetOrganizationByEmailAndPasswordUseCase {
    constructor(private organizationRepository: OrganizationRepository) { }

    async execute({ email, password }: GetOrganizationByEmailAndPasswordUseCaseRequest): Promise<GetOrganizationByEmailAndPasswordUseCaseResponse> {
        const organization = await this.organizationRepository.findByOrganizationByEmailAndPassword({ email, password });

        if (!organization) {
            throw new NotFoundOrganizationError()
        }

        return {
            organization
        };
    }
}
