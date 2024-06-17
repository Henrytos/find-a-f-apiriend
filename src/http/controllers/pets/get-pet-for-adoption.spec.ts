// @vitest-environment prisma

import { app } from '@/app'
import { makeCreateOrganizationInRepository } from '@/utils/factories/make-create-organization-in-repository'
import { makeCreatePetInRepository } from '@/utils/factories/make-create-pet-in-repository'
import request from 'supertest'

describe('register pet (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register a pet', async () => {
        const { organization } = await makeCreateOrganizationInRepository({
            email: "example@gmail.com",
            password: "123456789",
        })

        const { pet } = await makeCreatePetInRepository({
            organization_id: organization.id,
        })


        const response = await request(app.server).get(`/pets-adoption/${pet.id}`).send()

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            pet: expect.objectContaining({
                id: pet.id,
                name: pet.name,
            }),
            organization: expect.objectContaining({
                id: organization.id,
                manager_name: organization.manager_name,
            })
        })
    })

})