import { PetCharacteristics, PetRepository } from "@/repository/pet-repository";
import { Pet } from "@prisma/client";
import { NotFoundPetError } from "./errors/not-found-pet-error";



interface FetchPetsByCharacteristicsUseCaseRequest extends PetCharacteristics {
}
interface FetchPetsByCharacteristicsUseCaseResponse {
    pets: Pet[]
}

export class FetchPetsByCharacteristicsUseCase {
    constructor(private petRepository: PetRepository) { }

    async execute(petCharacteristics: FetchPetsByCharacteristicsUseCaseRequest): Promise<FetchPetsByCharacteristicsUseCaseResponse> {
        const pets = await this.petRepository.findManyPetByCharacteristics(petCharacteristics)
        return {
            pets
        }
    }

}