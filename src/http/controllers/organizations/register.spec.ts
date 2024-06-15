import request from 'supertest'
import { app } from "@/app"

describe('register organization (E2E)', () => {

    beforeEach(async () => {
        await app.ready()
    })

    afterEach(async () => {
        await app.close()
    })


    it('should register an organization', async () => {
        const response = await request(app.server).post('/organizations').send({
            manager_name: "henry",
            email: "henry2809@gmail.com",
            password: "123456789",
            phone: "11967603378",
            number: "10",
            zipCode: "02363158"
        })

        expect(response.status).toBe(201)
    })
})