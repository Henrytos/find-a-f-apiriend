import { InMemoryPetRepository } from "@/repository/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetUseCase } from "./register-pet-use-case";

let petRepository: InMemoryPetRepository
let sut: RegisterPetUseCase
describe('register pet (UNIT)', () => {
    beforeEach(() => {
        petRepository = new InMemoryPetRepository()
        sut = new RegisterPetUseCase(petRepository)
    })
    it('should register a pet', async () => {
        const { pet } = await sut.execute({
            id: 'pet-01',
            about: 'um pet muito legal',
            age: 1,
            environment: 'LARGE',
            image_url: [],
            level_independence: 'LARGE',
            name: 'pet',
            organization_id: 'organization-id-1',
            size: 'LARGE',
        }
        )
        console.log(pet)
        expect(pet).toEqual(
            expect.objectContaining({
                id: 'pet-01',
            })
        )
    })
})