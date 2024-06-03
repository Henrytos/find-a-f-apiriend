import { PrismaOrganizationRepository } from "@/repository/prisma/organization-repository";
import { RegisterOrganizationUseCase } from "../register-organization";

export function makeRegisterOrganizationUseCase() {
    const organizationRepository = new PrismaOrganizationRepository()
    const useCase = new RegisterOrganizationUseCase(organizationRepository)
    return useCase
}