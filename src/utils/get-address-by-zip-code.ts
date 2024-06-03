//TODO: api de cep https://viacep.com.br/

import { NotFoundZipCodeError } from "../use-cases/errors/not-found-zip-code-error"

interface Response {
    cep: string,
    logradouro: string
    complemento: string
    bairro: string
    localidade: string
    uf: string


}

interface getAddressByZipCodeResponse {
    zipCode: string,
    roadway: string
    neighborhood: string
    city: string
    state: string
}
export async function getAddressByZipCode(zipCode: string): Promise<getAddressByZipCodeResponse> {

    try {
        const data = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
        const response: Response = await data.json()
        return {
            neighborhood: response.bairro,
            zipCode: response.cep,
            city: response.localidade,
            roadway: response.logradouro,
            state: response.uf,
        }
    } catch (error) {
        throw new NotFoundZipCodeError()
    }

}