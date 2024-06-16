// @vitest-environment prisma

import request from 'supertest'
import { app } from "@/app"
import { makeCreateOrganizationInRepository } from '@/utils/factories/make-create-organization-in-repository'

describe('profile organization (E2E)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able profile organization', async () => {
        await makeCreateOrganizationInRepository({
            email: "example@gmail.com",
            password: "123456789",
        })

        const { body } = await request(app.server).post('/session').send({
            email: "example@gmail.com",
            password: "123456789",
        })

        const cookieAuth = body.token

        const response = await request(app.server).get('/me').set('Authorization', `Bearer ${cookieAuth}`)

        expect(response.body).toEqual(expect.objectContaining({
            email: "example@gmail.com",
        }))

        expect(response.status).toBe(200)
    })
})