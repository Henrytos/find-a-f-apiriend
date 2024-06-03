import { PrismaOrganizationRepository } from "@/repository/prisma/organization-repository";
import { GetOrganizationByEmailAndPasswordUseCase } from "../get-organization-by-email-and-password";

export function makeGetOrganizationByEmailAndPasswordUseCase() {
    const organizationRepository = new PrismaOrganizationRepository()
    const useCase = new GetOrganizationByEmailAndPasswordUseCase(organizationRepository)
    return useCase
}