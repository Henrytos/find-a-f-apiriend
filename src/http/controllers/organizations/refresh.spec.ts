// @vitest-environment prisma

import request from 'supertest'
import { app } from "@/app"
import { makeCreateOrganizationInRepository } from '@/utils/factories/make-create-organization-in-repository'

describe('refresh token organization (E2E)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it('should be able refresh token ', async () => {

        await makeCreateOrganizationInRepository({
            email: "example@gmail.com",
            password: "123456789",
        })

        const auth = await request(app.server).post('/session').send({
            email: "example@gmail.com",
            password: "123456789",
        })

        const cookies = auth.get('Set-Cookie') as string[]

        const response = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookies)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken')
        ])
    })
})