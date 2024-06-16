// @vitest-environment prisma

import request from 'supertest'
import { app } from "@/app"

describe('authenticate organization (E2E)', () => {

    beforeEach(async () => {
        await app.ready()
    })

    afterEach(async () => {
        await app.close()
    })


    it('should be able authenticate organization', async () => {
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
        expect(body.token).toEqual(expect.any(String))
    })
})