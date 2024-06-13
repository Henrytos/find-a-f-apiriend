import { InMemoryPetRepository } from "@/repository/in-memory/in-memory-pet-repository";

import { NotFoundPetError } from "./errors/not-found-pet-error";
import { GetPetForAdoptionUseCase } from "./get-pet-for-adoption";

let petRepository: InMemoryPetRepository
let sut: GetPetForAdoptionUseCase
describe('get pet for adoption useCase (UNIT)', () => {

    beforeEach(() => {
        petRepository = new InMemoryPetRepository()
        sut = new GetPetForAdoptionUseCase(petRepository)
        petRepository.items.push({
            id: 'pet-01',
            name: 'my-pet',
            about: 'um  dog legal',
            age: 'FILHOTE',
            level_independence: 'ALTO',
            level_environment: 'BAIXO',
            organization_id: 'organization-01',
            size: 'GRANDE',
            image_url: [],
            requirement: []
        })

    })

    it('It should be possible to view details of a pet up for adoption', async () => {
        const { pet } = await sut.execute({ petId: 'pet-01' })
        expect(pet).toEqual(
            expect.objectContaining({
                id: 'pet-01',
                name: 'my-pet',
                about: 'um  dog legal',
            })
        )
    })

    it('It should not be possible to view details of a pet where invalid petId ', async () => {
        await expect(() => sut.execute({ petId: 'invalid-id-pet' }))
            .rejects.toBeInstanceOf(NotFoundPetError)
    })
})