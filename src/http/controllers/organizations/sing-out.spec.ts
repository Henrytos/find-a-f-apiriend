// @vitest-environment prisma

import { app } from '@/app'
import { makeCreateOrganizationInRepository } from '@/utils/factories/make-create-organization-in-repository'
import request from 'supertest'

describe('register pet (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register a pet', async () => {
        await makeCreateOrganizationInRepository({
            email: "example@gmail.com",
            password: "123456789",
        })


        const auth = await request(app.server).post('/session').send({
            email: "example@gmail.com",
            password: "123456789",
        })

        const cookieAuth = auth.body.token

        const response = await request(app.server).post('/sing-out').set('Authorization', `Bearer ${cookieAuth}`).send()

        expect(response.status).toBe(200)
    })

})