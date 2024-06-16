import { NotFoundZipCodeError } from "@/use-cases/errors/not-found-zip-code-error";
import { makeRegisterOrganizationUseCase } from "@/use-cases/factories/make-register-organization";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        manager_name: z.string(),
        email: z.string().email(),
        password: z.string(),
        phone: z.string(),
        number: z.string(),
        zipCode: z.string(),
    })

    const { manager_name, email, password, phone, number, zipCode } = registerBodySchema.parse(req.body)

    const useCase = makeRegisterOrganizationUseCase()

    try {
        await useCase.execute({
            manager_name,
            email,
            password,
            phone,
            number,
            zipCode
        })

        reply.status(201).send()
    } catch (error) {
        if (error instanceof NotFoundZipCodeError) {
            return reply.status(400).send({ message: 'cep invalid' })
        }
        return reply.status(404).send({ message: 'internal server error' })
    }
}