import { Pet, Prisma } from "@prisma/client";

export interface CreatePetParams {
    data: Prisma.PetUncheckedCreateInput
}

export interface PetRepository {
    create(params: CreatePetParams): Promise<Pet>
}