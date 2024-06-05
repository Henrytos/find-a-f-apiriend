import { prisma } from "@/lib/prisma";
import { CreatePetParams, FindManyPetByManyOrganizationIdParams, PetCharacteristics, PetRepository } from "../pet-repository";
import { randomUUID } from "crypto";

export class PrismaPetRepository implements PetRepository {


    async findManyPetByCharacteristics(petCharacteristics: PetCharacteristics) {

        const pets = await prisma.pet.findMany({
            where: {
                age: petCharacteristics.age,
                size: petCharacteristics.size,
                level_environment: petCharacteristics.level_environment,
                level_independence: petCharacteristics.level_independence,
            }
        })

        return pets
    }

    async findByPetId(id: string) {
        const pet = await prisma.pet.findUnique({
            where: {
                id,
            }
        })

        if (!pet) {
            return null
        }

        return pet
    }

    async create({ data }: CreatePetParams) {
        const pet = await prisma.pet.create({
            data: {
                id: data.id ?? randomUUID(),
                about: data.about,
                name: data.name,
                age: data.age,
                level_environment: data.level_environment,
                level_independence: data.level_independence,
                size: data.size,
                image_url: data.image_url,
                requirement: data.requirement,
                organization_id: data.organization_id,
            }
        })

        return pet

    }

    async findManyPetByOrganizationId(organizationId: string) {
        const pets = await prisma.pet.findMany({
            where: {
                organization_id: organizationId
            }
        })

        return pets
    }

    async findManyPetByManyOrganizationId({ organizationsId, petCharacteristics }: FindManyPetByManyOrganizationIdParams) {

        if (petCharacteristics) {
            const pets = await prisma.pet.findMany({
                where: {
                    AND: [
                        {
                            OR: [
                                ...organizationsId.map((id) => ({
                                    organization_id: id
                                }))
                            ]
                        },
                        {
                            age: petCharacteristics.age,
                            size: petCharacteristics.size,
                            level_environment: petCharacteristics.level_environment,
                            level_independence: petCharacteristics.level_independence,
                        }
                    ]
                }
            })
            return pets
        }

        const pets = await prisma.pet.findMany({
            where: {
                OR: [
                    ...organizationsId.map((id) => ({
                        organization_id: id
                    }))
                ]
            }
        })

        return pets

    }
}