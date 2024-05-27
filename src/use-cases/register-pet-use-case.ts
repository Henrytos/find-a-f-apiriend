import { PetRepository } from "@/repository/pet-repository";

interface RegisterPetUseCaseRequest { }
interface RegisterPetUseCaseResponse {

}

export class RegisterPetUseCase {
    constructor(private petRepository: PetRepository) { }

    async execute(request: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {

        return {

        };
    }

}