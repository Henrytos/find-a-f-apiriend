//TODO: api de cep https://viacep.com.br/

interface Response {
    cep: string,
    logradouro: string
    complemento: string
    bairro: string
    localidade: string
    uf: string


}

interface getAddressByZipCodeResponse {
    address: {
        cep: string,
        roadway: string
        neighborhood: string
        city: string
        state: string
        address: string
    }
}
export async function getAddressByZipCode(zipCode: string): Promise<getAddressByZipCodeResponse> {

    const data = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
    const response: Response = await data.json()
    return {
        address: {
            address: response.logradouro,
            neighborhood: response.bairro,
            cep: response.cep,
            city: response.localidade,
            roadway: response.logradouro,
            state: response.uf,
        }
    }
}