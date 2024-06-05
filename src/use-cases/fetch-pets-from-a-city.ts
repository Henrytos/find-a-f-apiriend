import { OrganizationRepository } from "@/repository/organization-repository";
import { PetRepository } from "@/repository/pet-repository";
import { $Enums, Pet, Prisma } from "@prisma/client";
import { NotFoundOrganizationInCityError } from "./errors/not-found-organization-in-city-error";


interface FetchPetsFromACityUseCaseRequest {
    cityName: string
    petCharacteristics?: {
        age: $Enums.PET_AGE
        size: $Enums.PET_SIZE
        level_independence: $Enums.PET_LEVEL_INDEPENDENCE
        level_environment: $Enums.PET_LEVEL_ENVIRONMENT
    }
}
interface FetchPetsFromACityUseCaseResponse {
    pets: Pet[]
}

export class FetchPetsFromACityUseCase {
    constructor(private organizationRepository: OrganizationRepository, private petRepository: PetRepository) { }

    async execute({ cityName, petCharacteristics }: FetchPetsFromACityUseCaseRequest): Promise<FetchPetsFromACityUseCaseResponse> {

        const organizations = await this.organizationRepository.findManyOrganizationByCityName(cityName)
        if (!organizations) {
            throw new NotFoundOrganizationInCityError()
        }

        const organizationsId = organizations.map(org => org.id)
        const pets = await this.petRepository.findManyPetByManyOrganizationId({ organizationsId, petCharacteristics })
        return {
            pets
        };
    }

}