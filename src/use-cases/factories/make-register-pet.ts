import { PrismaPetRepository } from "@/repository/prisma/pet-repository";
import { RegisterPetUseCase } from "../register-pet";

export function makeRegisterPetUseCase() {
    const prismaPetRepository = new PrismaPetRepository()
    const useCase = new RegisterPetUseCase(prismaPetRepository)
    return useCase
}