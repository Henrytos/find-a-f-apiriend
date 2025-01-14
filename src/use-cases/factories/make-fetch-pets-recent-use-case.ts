import { PrismaPetRepository } from "@/repository/prisma/pet-repository"
import { FetchPetsRecentUseCase } from "../fetch-pets-recent-use-case"


export function makeFetchPetsRecentUseCase(): FetchPetsRecentUseCase {
    const petsRepository = new PrismaPetRepository()
    const fetchPetsRecentUseCase = new FetchPetsRecentUseCase(petsRepository)
    return fetchPetsRecentUseCase
}