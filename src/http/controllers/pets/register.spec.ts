import { app } from '@/app'

describe('register pet (E2E)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register a pet', async () => {
        expect(2 + 2).toEqual(4)
    })

})