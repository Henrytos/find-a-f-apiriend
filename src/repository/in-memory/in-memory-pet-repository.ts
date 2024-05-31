import { $Enums, Pet } from "@prisma/client";
import { CreatePetParams, PetRepository } from "../pet-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";

export class InMemoryPetRepository implements PetRepository {
    public items: Pet[] = []


    async findById(petId: string) {
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
            age: new Decimal(+data.age),
            environment: data.environment,
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

    async findByPetsToOrganizationId(organizationId: string) {
        const pets = this.items.filter(item => item.organization_id === organizationId)
        return pets
    }

    async findByPetsToOrganizationsId({ organizationsId }: { organizationsId: string[]; }) {
        const pets = []

        for (const organizationId of organizationsId) {
            const pet = await this.findByPetsToOrganizationId(organizationId)
            pets.push(...pet)
        }

        return pets

    }
}