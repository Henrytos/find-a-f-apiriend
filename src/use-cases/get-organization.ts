import { OrganizationRepository } from "@/repository/organization-repository";
import { PetRepository } from "@/repository/pet-repository";
import { Organization, Pet } from "@prisma/client";
import { NotFoundPetError } from "./errors/not-found-pet-error";
import { NotFoundOrganizationError } from "./errors/not-found-organition";

interface GetOrganizationUseCaseRequest {
    organizationId: string;
}
interface GetOrganizationUseCaseResponse {
    organization: Organization
}

export class GetOrganizationUseCase {
    constructor(private organizationRepository: OrganizationRepository) { }

    async execute({ organizationId }: GetOrganizationUseCaseRequest): Promise<GetOrganizationUseCaseResponse> {
        const organization = await this.organizationRepository.findByOrganizationId(organizationId);

        if (!organization) {
            throw new NotFoundOrganizationError()
        }

        return {
            organization
        };
    }

}