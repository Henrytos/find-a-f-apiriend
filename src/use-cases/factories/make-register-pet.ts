import { PrismaPetRepository } from "@/repository/prisma/pet-repository";
import { RegisterPetUseCase } from "../register-pet";
import { PrismaOrganizationRepository } from "@/repository/prisma/organization-repository";

export function makeRegisterPetUseCase() {
    const prismaPetRepository = new PrismaPetRepository()
    const organizationRepository = new PrismaOrganizationRepository()
    const useCase = new RegisterPetUseCase(prismaPetRepository, organizationRepository)
    return useCase
}