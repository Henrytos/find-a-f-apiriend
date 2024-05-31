import { InMemoryPetRepository } from "@/repository/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetUseCase } from "./register-pet";

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
            age: 'FILHOTE',
            level_environment: 'MEDIO',
            image_url: [],
            level_independence: 'BAIXO',
            name: 'pet',
            organization_id: 'organization-id-1',
            size: 'PEQUENO',
        }
        )
        expect(pet).toEqual(
            expect.objectContaining({
                id: 'pet-01',
            })
        )
    })
})