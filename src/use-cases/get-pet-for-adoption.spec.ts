import { InMemoryPetRepository } from "@/repository/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrganizationRepository } from "@/repository/in-memory/in-memory-organization-repository";
import { FetchPetsFromACityUseCase } from "./fetch-pets-from-a-city";
import { Decimal } from "@prisma/client/runtime/library";
import { NotFoundOrganizationInCityError } from "./errors/not-found-organization-error";
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
            age: new Decimal(+'1'),
            environment: 'LARGE',
            level_independence: 'LARGE',
            organization_id: 'organization-01',
            size: 'LARGE',
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