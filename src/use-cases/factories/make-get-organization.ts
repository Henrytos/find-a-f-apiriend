import { PrismaOrganizationRepository } from "@/repository/prisma/organization-repository";
import { GetOrganizationUseCase } from "../get-organization";

export function makeGetOrganizationUseCase() {
    const organizationRepository = new PrismaOrganizationRepository()
    const useCase = new GetOrganizationUseCase(organizationRepository)
    return useCase
}