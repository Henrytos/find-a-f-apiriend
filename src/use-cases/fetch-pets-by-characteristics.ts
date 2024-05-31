import { OrganizationRepository } from "@/repository/organization-repository";
import { PetRepository } from "@/repository/pet-repository";
import { Pet } from "@prisma/client";



interface FetchPetsByCharacteristicsUseCaseRequest {

}
interface FetchPetsByCharacteristicsUseCaseResponse {
    pets: Pet[]
}

export class FetchPetsByCharacteristicsUseCase {
    constructor(private organizationRepository: OrganizationRepository, private petRepository: PetRepository) { }

    async execute({ }: FetchPetsByCharacteristicsUseCaseRequest): Promise<FetchPetsByCharacteristicsUseCaseResponse> {


        return {
            pets: []
        }
    }

}