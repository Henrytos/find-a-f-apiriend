import { $Enums, Pet } from "@prisma/client";
import { CreatePetParams, FindManyPetByManyOrganizationIdParams, PetCharacteristics, PetRepository } from "../pet-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";

export class InMemoryPetRepository implements PetRepository {

    public items: Pet[] = []

    async findManyPetByCharacteristics(petCharacteristics: PetCharacteristics) {
        const pets = this.items.filter(item => item.age === petCharacteristics.age && item.size === petCharacteristics.size && item.level_independence === petCharacteristics.level_independence && item.level_environment === petCharacteristics.level_environment)
        return pets
    }

    async findByPetId(petId: string) {
        const pet = this.items.find(item => item.id === petId);
        if (!pet) {
            return null
        }
        return pet
    }
    async create({ data }: CreatePetParams) {
        const pet: Pet = {
            id: data.id ? data.id : randomUUID(),
            name: data.name,
            about: data.about,
            age: data.age,
            level_environment: data.level_environment,
            size: data.size,
            image_url: [],
            requirement: [],
            level_independence: data.level_independence,
            organization_id: data.organization_id,
        }

        this.items.push(
            pet
        )

        return pet

    }

    async findManyPetByOrganizationId(organizationId: string) {
        const pets = this.items.filter(item => item.organization_id === organizationId)
        return pets
    }

    async findManyPetByManyOrganizationId({ organizationsId, petCharacteristics }: FindManyPetByManyOrganizationIdParams) {
        const pets = []

        if (petCharacteristics) {
            for (const organizationId of organizationsId) {
                const pet: Pet[] = await this.findManyPetByOrganizationId(organizationId)
                const filteredPet = pet.filter(item => item.age === petCharacteristics.age && item.size === petCharacteristics.size && item.level_independence === petCharacteristics.level_independence && item.level_environment === petCharacteristics.level_environment)
                pets.push(...filteredPet)
            }
            return pets
        }

        for (const organizationId of organizationsId) {
            const pet = await this.findManyPetByOrganizationId(organizationId)
            pets.push(...pet)
        }

        return pets

    }
}