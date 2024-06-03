import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrganizationRepository } from "@/repository/in-memory/in-memory-organization-repository";
import { RegisterOrganizationUseCase } from "./register-organization";
import { NotFoundZipCodeError } from "@/utils/errors/not-found-zip-code-error";

let organizationRepository: InMemoryOrganizationRepository
let sut: RegisterOrganizationUseCase

describe('register organization use case (UNIT)', () => {

    beforeEach(() => {
        organizationRepository = new InMemoryOrganizationRepository()
        sut = new RegisterOrganizationUseCase(organizationRepository)
    })

    it('should register a organization', async () => {
        const { organization } = await sut.execute({
            email: 'test.example@gmail.com',
            password: 'password-test',
            manager_name: 'manager name example',
            phone: '11 99999 9999',
            number: '123',
            zipCode: '02363158',
        })

        expect(organization).toEqual(
            expect.objectContaining({
                manager_name: 'manager name example',
                email: 'test.example@gmail.com',
            })
        )
    })

    it('should register a organization', async () => {
        await expect(() => sut.execute({
            email: 'test.example@gmail.com',
            password: 'password-test',
            manager_name: 'manager name example',
            phone: '11 99999 9999',
            number: '123',
            zipCode: 'invalid-zip-code',
        })).rejects.toBeInstanceOf(NotFoundZipCodeError)
    })

})