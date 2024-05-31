import { beforeEach, describe, expect, it } from "vitest";
import { FetchPetsByCharacteristicsUseCase } from "./fetch-pets-by-characteristics";
import { InMemoryPetRepository } from "@/repository/in-memory/in-memory-pet-repository";


let petRepository: InMemoryPetRepository
let sut: FetchPetsByCharacteristicsUseCase

describe('Fetch Pets By Characteristics Use Case (UNIT)', () => {
    beforeEach(() => {
        petRepository = new InMemoryPetRepository()
        sut = new FetchPetsByCharacteristicsUseCase(petRepository)
    })

    it('should be possible to filter pets by characteristics', async () => {

        petRepository.items.push({
            id: 'pet-01',
            about: 'um  dog legal',
            name: 'perrito',
            age: 'FILHOTE',
            level_independence: 'BAIXO',
            level_environment: 'BAIXO',
            size: 'PEQUENO',
            organization_id: 'organization-01',
            image_url: [],
            requirement: []
        })

        petRepository.items.push({
            id: 'pet-02',
            about: 'um  cat legal',
            name: 'gatito',
            age: 'FILHOTE',
            level_independence: 'BAIXO',
            level_environment: 'BAIXO',
            size: 'PEQUENO',
            organization_id: 'organization-01',
            image_url: [],
            requirement: []
        })


        const { pets } = await sut.execute({
            age: 'FILHOTE',
            level_independence: 'BAIXO',
            level_environment: 'BAIXO',
            size: 'PEQUENO',
        })

        expect(pets).toEqual([
            expect.objectContaining({
                name: 'perrito',
            }),
            expect.objectContaining({
                name: 'gatito',
            }),
        ])

    })
})