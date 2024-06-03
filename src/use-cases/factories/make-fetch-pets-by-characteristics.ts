import { PrismaPetRepository } from "@/repository/prisma/pet-repository";
import { FetchPetsByCharacteristicsUseCase } from "../fetch-pets-by-characteristics";

export function makeFetchPetsByCharacteristicsUseCase() {
    const prismaPetRepository = new PrismaPetRepository()
    const useCase = new FetchPetsByCharacteristicsUseCase(prismaPetRepository)
    return useCase
}