import { OrganizationRepository } from "@/repository/organization-repository";
import { PetRepository } from "@/repository/pet-repository";
import { Pet, Prisma } from "@prisma/client";
import { NotFoundOrganizationInCity } from "./errors/not-found-organization";

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

        const organizations = await this.organizationRepository.findByCityName(cityName)

        if (!organizations) {
            throw new NotFoundOrganizationInCity()
        }

        const organizationsId = organizations.map(org => org.id)
        const pets = await this.petRepository.findByPetsToOrganizationsId({ organizationsId })
        return {
            pets
        };
    }

}