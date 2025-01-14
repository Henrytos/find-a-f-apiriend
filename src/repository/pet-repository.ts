import { Pet, $Enums, Prisma } from "@prisma/client";

export interface CreatePetParams {
    data: Prisma.PetUncheckedCreateInput
}

export interface PetCharacteristics {
    age: $Enums.PET_AGE
    size: $Enums.PET_SIZE
    level_independence: $Enums.PET_LEVEL_INDEPENDENCE
    level_environment: $Enums.PET_LEVEL_ENVIRONMENT
}
export interface FindManyPetByManyOrganizationIdParams {
    organizationsId: string[],
    petCharacteristics?: PetCharacteristics
}
export interface PetRepository {
    create(params: CreatePetParams): Promise<Pet>
    findByPetId(petId: string): Promise<Pet | null>
    findManyPetByOrganizationId(organizationId: string): Promise<Pet[]>
    findManyPetByManyOrganizationId({ organizationsId, petCharacteristics }: FindManyPetByManyOrganizationIdParams): Promise<Pet[]>
    findManyPetByCharacteristics(data: PetCharacteristics): Promise<Pet[]>
    fetchRecent(page: number, perPage: number): Promise<Pet[]>
}