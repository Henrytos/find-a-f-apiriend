import { PetRepository } from "@/repository/pet-repository";
import { $Enums, Pet } from "@prisma/client"


interface FetchPetsByCharacteristicsUseCaseRequest {
    age: $Enums.PET_AGE
    size: $Enums.PET_SIZE
    level_independence: $Enums.PET_LEVEL_INDEPENDENCE
    level_environment: $Enums.PET_LEVEL_ENVIRONMENT
}

interface FetchPetsByCharacteristicsUseCaseResponse {
    pets: Pet[]
}


export class FetchPetsByCharacteristicsUseCase {
    constructor(private petRepository: PetRepository) { }

    async execute({  age , size, level_independence , level_environment,  }: FetchPetsByCharacteristicsUseCaseRequest) { 
        const pets = await this.petRepository.findManyPetByCharacteristics({  age, size, level_independence, level_environment })
        
        
        return {
            pets
        }
    }
}