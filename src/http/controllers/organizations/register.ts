import { NotFoundZipCodeError } from "@/use-cases/errors/not-found-zip-code-error";
import { makeRegisterOrganizationUseCase } from "@/use-cases/factories/make-register-organization";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        manager_name: z.string(),
        email: z.string(),
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

        reply.send().status(201)

    } catch (error) {
        if (error instanceof NotFoundZipCodeError) {
            reply.send('cep invalid').status(500)
        }
        reply.send('internal server error').status(500)
    }
}