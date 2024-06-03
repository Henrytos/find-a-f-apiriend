import { PrismaPetRepository } from "@/repository/prisma/pet-repository";
import { FetchPetsFromACityUseCase } from "../fetch-pets-from-a-city";
import { PrismaOrganizationRepository } from "@/repository/prisma/organization-repository";

export function makeFetchPetsFromACityUseCase() {
    const prismaPetRepository = new PrismaPetRepository()
    const prismaOrganizationRepository = new PrismaOrganizationRepository()
    const useCase = new FetchPetsFromACityUseCase(prismaOrganizationRepository, prismaPetRepository)
    return useCase
}