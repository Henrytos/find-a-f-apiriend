import { OrganizationRepository } from "@/repository/organization-repository";
import { PetRepository } from "@/repository/pet-repository";
import { Pet, Prisma } from "@prisma/client";
import { NotFoundOrganizationInCityError } from "./errors/not-found-organization-in-city-error";

type LevelPet = 'SMALL' | 'MEDIUM' | 'LARGE'


interface FetchPetsFromACityUseCaseRequest {
    cityName: string
}
interface FetchPetsFromACityUseCaseResponse {
    pets: Pet[]
}

export class FetchPetsFromACityUseCase {
    constructor(private organizationRepository: OrganizationRepository, private petRepository: PetRepository) { }

    async execute({ cityName }: FetchPetsFromACityUseCaseRequest): Promise<FetchPetsFromACityUseCaseResponse> {

        const organizations = await this.organizationRepository.findManyOrganizationByCityName(cityName)
        if (!organizations) {
            throw new NotFoundOrganizationInCityError()
        }

        const organizationsId = organizations.map(org => org.id)
        const pets = await this.petRepository.findManyPetByManyOrganizationId({ organizationsId })
        return {
            pets
        };
    }

}