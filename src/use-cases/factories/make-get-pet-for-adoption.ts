import { PrismaPetRepository } from "@/repository/prisma/pet-repository";
import { GetPetForAdoptionUseCase } from "../get-pet-for-adoption";

export function makeGetPetForAdoptionUseCase() {
    const prismaPetRepository = new PrismaPetRepository()
    const useCase = new GetPetForAdoptionUseCase(prismaPetRepository)
    return useCase
}