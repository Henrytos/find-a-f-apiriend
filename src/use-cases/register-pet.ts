import { PetRepository } from "@/repository/pet-repository";
import { Pet, Prisma } from "@prisma/client";

type LevelPet = 'SMALL' | 'MEDIUM' | 'LARGE'


interface RegisterPetUseCaseRequest {
    id?: string
    about: string
    name: string
    age: number
    size: LevelPet
    level_independence: LevelPet
    environment: LevelPet
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