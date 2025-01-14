import { prisma } from "@/lib/prisma";
import { faker } from '@faker-js/faker'
import { $Enums, Pet } from "@prisma/client";
import { randomUUID } from "crypto";

interface makeCreatePetInRepositoryParams {
    organization_id: string,
    age?: $Enums.PET_AGE,
    size?: $Enums.PET_SIZE,
    level_environment?: $Enums.PET_LEVEL_ENVIRONMENT,
    level_independence?: $Enums.PET_LEVEL_INDEPENDENCE
}

interface makeCreatePetInRepositoryResponse {
    pet: Pet
}


export async function makeCreatePetInRepository({
    organization_id,
    age,
    level_environment,
    level_independence,
    size
}: makeCreatePetInRepositoryParams): Promise<makeCreatePetInRepositoryResponse> {
    const pet = await prisma.pet.create({
        data: {
            id: randomUUID(),
            organization_id,
            name: faker.animal.dog(),
            about: faker.lorem.sentence(),
            age: age ?? 'FILHOTE',
            level_environment: level_environment ?? 'ALTO',
            level_independence: level_independence ?? 'ALTO',
            size: size ?? 'GRANDE',
            image_url: [faker.image.url()],
            requirement: [faker.lorem.sentence()],
            
        }
    })

    return { pet }
}