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

        const { body } = await request(app.server).post('/session').send({
            email: "example@gmail.com",
            password: "123456789",
        })

        const cookieAuth = body.refresh

        const response = await request(app.server).post('/pets').set('Authorization', `Bearer ${cookieAuth}`).send({
            name: 'Rex',
            about: 'um belo de um cachorro',
            age: 'FILHOTE',
            size: 'PEQUENO',
            level_independence: 'BAIXO',
            level_environment: 'BAIXO',
            image_url: ['https://www.google.com'],
            requirement: ['Passeios diários']
        })

        console.log(response.status)
    })

})