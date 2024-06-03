import { describe, expect, it } from "vitest";
import { getAddressByZipCode } from "./get-address-by-zip-code";
import { NotFoundZipCodeError } from "./errors/not-found-zip-code-error";

describe('get address by zip code (UNIT)', () => {
    it('should return an address by zip code', async () => {

        const address = await getAddressByZipCode('02363158')
        expect(address).toEqual(
            expect.objectContaining({
                zipCode: '02363-158'
            })
        )
    })

    it('should not return an address by zip code invalid ', async () => {
        await expect(() => getAddressByZipCode('invalid-zip-code')).rejects.toBeInstanceOf(NotFoundZipCodeError)
    })
})