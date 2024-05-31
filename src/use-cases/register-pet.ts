import { PetRepository } from "@/repository/pet-repository";
import { PET_LEVEL_ENVIRONMENT, PET_LEVEL_INDEPENDENCE, Pet, PET_AGE, PET_SIZE } from "@prisma/client";

type LevelPet = 'SMALL' | 'MEDIUM' | 'LARGE'


interface RegisterPetUseCaseRequest {
    id?: string
    about: string
    name: string
    age: PET_AGE
    size: PET_SIZE
    level_independence: PET_LEVEL_INDEPENDENCE
    level_environment: PET_LEVEL_ENVIRONMENT
    image_url?: string[]
    requirement?: string[]
    organization_id: string
}
interface RegisterPetUseCaseResponse {
    pet: Pet
}

export class RegisterPetUseCase {
    constructor(private petRepository: PetRepository) { }

    async execute(data: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
        const pet = await this.petRepository.create({ data });
        return {
            pet
        };
    }

}