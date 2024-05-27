import { Pet } from "@prisma/client";
import { CreatePetParams, PetRepository } from "../pet-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";

export class InMemoryPetRepository implements PetRepository {
    private items: Pet[] = []
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

}