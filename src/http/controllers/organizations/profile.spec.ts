// @vitest-environment prisma

import request from 'supertest'
import { app } from "@/app"

describe('profile organization (E2E)', () => {

    beforeEach(async () => {
        await app.ready()
    })

    afterEach(async () => {
        await app.close()
    })


    it('should be able profile organization', async () => {
        await request(app.server).post('/organizations').send({
            manager_name: "henry",
            email: "henry@gmail.com",
            password: "123456789",
            phone: "11967603378",
            number: "10",
            zipCode: "02363158"
        })

        const { body } = await request(app.server).post('/session').send({
            email: "henry@gmail.com",
            password: "123456789",
        })

        const cookieAuth = body.token

        const response = await request(app.server).get('/me').set('Authorization', `Bearer ${cookieAuth}`)

        expect(response.body).toEqual(expect.objectContaining({
            manager_name: 'henry',
            email: 'henry@gmail.com',
        }))

        expect(response.status).toBe(200)
    })
})