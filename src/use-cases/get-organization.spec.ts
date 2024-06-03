import { InMemoryOrganizationRepository } from "@/repository/in-memory/in-memory-organization-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetOrganizationUseCase } from "./get-organization";
import { NotFoundOrganizationError } from "./errors/not-found-organition";

let organizationRepository: InMemoryOrganizationRepository
let sut: GetOrganizationUseCase


describe('get organization use case (UNIT)', () => {

    beforeEach(() => {
        organizationRepository = new InMemoryOrganizationRepository()
        sut = new GetOrganizationUseCase(organizationRepository)

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

    it('should return organization by organization id', async () => {
        const { organization } = await sut.execute({ organizationId: 'organization-01' })
        expect(organization).toEqual(
            expect.objectContaining({
                id: 'organization-01',
                city: 'são paulo',
                email: 'organization.example@example.com',
                manager_name: 'organization name manager',
            })
        )
    })

    it('should return null when organization id is invalid', async () => {
        await expect(() => sut.execute({ organizationId: 'invalid-organization-id' })).rejects.toBeInstanceOf(NotFoundOrganizationError)
    })
})