// @vitest-environment prisma

import { app } from '@/app'
import { makeCreateOrganizationInRepository } from '@/utils/factories/make-create-organization-in-repository'
import { makeCreatePetInRepository } from '@/utils/factories/make-create-pet-in-repository'
import request from 'supertest'

describe('fetch pets (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to fetch pets by city name', async () => {
        const { organization } = await makeCreateOrganizationInRepository({
            email: "example@gmail.com",
            password: "123456789",
            city: "city-name-example"
        })

        await makeCreatePetInRepository({
            organization_id: organization.id,
        })

        await makeCreatePetInRepository({
            organization_id: organization.id,
        })

        const response = await request(app.server).get(`/pets/city-name-example`).send()

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            count: 2,
            pets: [
                expect.objectContaining({
                    organization_id: organization.id
                }),
                expect.objectContaining({
                    organization_id: organization.id
                }),
            ]
        })

    })


    it('should be able to fetch pets by city name and pet characteristics', async () => {
        const { organization } = await makeCreateOrganizationInRepository({
            email: "example@gmail.com",
            password: "123456789",
            city: "city-name-example"
        })

        const { pet } = await makeCreatePetInRepository({
            organization_id: organization.id,
            age: 'FILHOTE',
            level_environment: 'BAIXO',
            level_independence: 'BAIXO',
            size: 'PEQUENO'
        })

        await makeCreatePetInRepository({
            organization_id: organization.id,
            level_environment: 'ALTO',
            level_independence: 'ALTO',
            age: 'IDOSO'
        })

        const response = await request(app.server).get(`/pets/city-name-example?age=${pet.age}&level_environment=${pet.level_environment}&level_independence=${pet.level_environment}&size=${pet.size}`).send()

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            count: 1,
            pets: [
                expect.objectContaining({
                    age: pet.age,
                    level_environment: pet.level_environment,
                    level_independence: pet.level_independence,
                    size: pet.size
                }),
            ]
        })

    })



})