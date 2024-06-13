import { InMemoryOrganizationRepository } from "@/repository/in-memory/in-memory-organization-repository";
import { NotFoundOrganizationError } from "./errors/not-found-organization";
import { hash } from "bcrypt";
import { AuthenticateOrganizationUseCase } from "./authenticate-organization";

let organizationRepository: InMemoryOrganizationRepository
let sut: AuthenticateOrganizationUseCase


describe('authenticate organization use case (UNIT)', () => {

    beforeEach(() => {
        organizationRepository = new InMemoryOrganizationRepository()
        sut = new AuthenticateOrganizationUseCase(organizationRepository)


    })

    it('should authenticate by email and password', async () => {

        organizationRepository.items.push({
            id: 'organization-01',
            city: 'são paulo',
            email: 'organization.example@example.com',
            manager_name: 'organization name manager',
            neighborhood: '',
            number: '',
            password_hash: await hash('password example', 8),
            phone: '11 99999 9999',
            roadway: '',
            role: 'ORG',
            state: '',
        })

        const { organization } = await sut.execute({ email: 'organization.example@example.com', password: 'password example' })
        expect(organization).toEqual(
            expect.objectContaining({
                id: 'organization-01',
                city: 'são paulo',
                email: 'organization.example@example.com',
                manager_name: 'organization name manager',
            })
        )
    })

    it('should return not found error organization by password or email invalid', async () => {
        await expect(() => sut.execute({ email: 'invalid email', password: 'invalid password' })).rejects.toBeInstanceOf(NotFoundOrganizationError)
    })
})