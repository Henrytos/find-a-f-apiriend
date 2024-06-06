import { InMemoryOrganizationRepository } from "@/repository/in-memory/in-memory-organization-repository";
import { InMemoryPetRepository } from "@/repository/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchPetsFromACityUseCase } from "./fetch-pets-from-a-city";
import { NotFoundOrganizationInCityError } from "./errors/not-found-organization-in-city-error";

let organizationRepository: InMemoryOrganizationRepository
let petRepository: InMemoryPetRepository
let sut: FetchPetsFromACityUseCase
describe('fetch pets from a city use case (UNIT)', () => {
    beforeEach(() => {
        organizationRepository = new InMemoryOrganizationRepository()
        petRepository = new InMemoryPetRepository()
        sut = new FetchPetsFromACityUseCase(organizationRepository, petRepository)
        organizationRepository.items.push({
            id: 'organization-01',
            city: 'são paulo',
            email: 'organization.example@example.com',
            manager_name: 'organization name manager',
            neighborhood: '',
            number: '',
            password_hash: '',
            phone: '11 99999 9999',
            roadway: '',
            role: 'ORG',
            state: '',
        })

        petRepository.items.push({
            id: 'pet-01',
            organization_id: 'organization-01',
            name: 'pet name',
            about: 'about pet',
            level_independence: 'BAIXO',
            age: 'FILHOTE',
            level_environment: 'BAIXO',
            size: 'PEQUENO',
            requirement: [],
            image_url: [],
        })

        petRepository.items.push({
            id: 'pet-01',
            organization_id: 'organization-01',
            name: 'pet name',
            about: 'about pet',
            level_independence: 'ALTO',
            age: 'IDOSO',
            level_environment: 'ALTO',
            size: 'GRANDE',
            requirement: [],
            image_url: [],
        })
    })

    it('should fetch pets from a city', async () => {


        const { pets } = await sut.execute({ cityName: 'são paulo' })
        expect(pets).toEqual([expect.objectContaining({
            name: 'pet name',
            about: 'about pet',
            level_independence: 'BAIXO',
            age: 'FILHOTE',
            level_environment: 'BAIXO',
            size: 'PEQUENO',
        }),
        expect.objectContaining({
            name: 'pet name',
            about: 'about pet',
            level_independence: 'ALTO',
            age: 'IDOSO',
            level_environment: 'ALTO',
            size: 'GRANDE',
        })
        ])
    })

    it('should not fetch pets from a invalid city', async () => {
        await expect(sut.execute({ cityName: 'invalid city name' })).rejects.toBeInstanceOf(NotFoundOrganizationInCityError)
    })

    it('should fetch pets from a city and pet characteristics', async () => {


        const { pets } = await sut.execute({
            cityName: 'são paulo', petCharacteristics: {
                level_independence: 'ALTO',
                age: 'IDOSO',
                level_environment: 'ALTO',
                size: 'GRANDE',
            }
        })
        expect(pets).toEqual([expect.objectContaining({
            name: 'pet name',
            about: 'about pet',
            level_independence: 'ALTO',
            age: 'IDOSO',
            level_environment: 'ALTO',
            size: 'GRANDE',
        })])
    })
})