import { PetRepository } from "@/repository/pet-repository";
import { Pet } from "@prisma/client";

interface FetchPetsRecentUseCaseRequest {
    page: number;
    perPage: number;
}


interface FetchPetsRecentUseCaseResponse {
    pets: Pet[];
}

export class FetchPetsRecentUseCase{
    constructor(private readonly petsRepository: PetRepository){}

    async execute(request: FetchPetsRecentUseCaseRequest): Promise<FetchPetsRecentUseCaseResponse>{
        const pets = await this.petsRepository.fetchRecent(request.page, request.perPage)
        
        return { pets }
    }
}