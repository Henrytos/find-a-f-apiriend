import { expect, it } from "vitest";
import { getAddressByZipCode } from "./get-address-by-zip-code";
import { env } from "@/env";

it('should return an address by zip code', async () => {

    const { address } = await getAddressByZipCode('02363158')
    expect(address).toEqual(
        expect.objectContaining({
            cep: '02363-158'
        })
    )
})