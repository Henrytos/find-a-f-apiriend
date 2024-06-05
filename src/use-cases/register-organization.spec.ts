import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrganizationRepository } from "@/repository/in-memory/in-memory-organization-repository";
import { RegisterOrganizationUseCase } from "./register-organization";
import { NotFoundZipCodeError } from "./errors/not-found-zip-code-error";
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists-error";
import { randomUUID } from "crypto";

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
        expect(organization.password_hash).not.toEqual('password-test')
        expect(organization).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                manager_name: 'manager name example',
                email: 'test.example@gmail.com',
            })
        )
    })

    it('should not register a organization duplicate email', async () => {
        organizationRepository.items.push({
            id: randomUUID(),
            email: 'test.example@gmail.com',
            password_hash: 'password-test',
            manager_name: 'manager name example',
            phone: '11 99999 9999',
            number: '123',
            city: 'San Francisco',
            neighborhood: 'neighborhood example',
            roadway: 'roadway example',
            role: 'ORG',
            state: 'state example',
        })
        await expect(() => sut.execute({
            email: 'test.example@gmail.com',
            password: 'password-test',
            manager_name: 'manager name example',
            phone: '11 99999 9999',
            number: '123',
            zipCode: '02363158',
        })).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)


    })

    it('should not register a organization invalid zip code ', async () => {
        await expect(() => sut.execute({
            email: 'test.example.@gmail.com',
            password: 'password-test',
            manager_name: 'manager name example',
            phone: '11 99999 9999',
            number: '123',
            zipCode: 'invalid-zip-code',
        })).rejects.toBeInstanceOf(NotFoundZipCodeError)
    })

})