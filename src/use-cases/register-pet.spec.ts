import { InMemoryPetRepository } from "@/repository/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterPetUseCase } from "./register-pet";
import { InMemoryOrganizationRepository } from "@/repository/in-memory/in-memory-organization-repository";

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: RegisterPetUseCase
describe('register pet (UNIT)', () => {
    beforeEach(() => {
        petRepository = new InMemoryPetRepository()
        organizationRepository = new InMemoryOrganizationRepository()
        sut = new RegisterPetUseCase(petRepository, organizationRepository)
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
            organization_id: 'organization-01',
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