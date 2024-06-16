// @vitest-environment prisma

import request from 'supertest'
import { app } from "@/app"
import { makeCreateOrganizationInRepository } from '@/utils/factories/make-create-organization-in-repository'

describe('authenticate organization (E2E)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able authenticate organization', async () => {

        await makeCreateOrganizationInRepository({
            email: "example@gmail.com",
            password: "123456789",
        })

        const response = await request(app.server).post('/session').send({
            email: "example@gmail.com",
            password: "123456789",
        })

        expect(response.body.token).toEqual(expect.any(String))
        expect(response.status).toEqual(200)
    })
})