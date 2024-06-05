import { NotFoundZipCodeError } from "@/use-cases/errors/not-found-zip-code-error";
import { makeRegisterOrganizationUseCase } from "@/use-cases/factories/make-register-organization";
import { makeRegisterPetUseCase } from "@/use-cases/factories/make-register-pet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {
    const registerParamsSchema = z.object({
        organizationId: z.string().uuid()
    })
    const registerBodySchema = z.object({
        about: z.string(),
        name: z.string(),
        age: z.enum(['FILHOTE', 'ADULTO', 'IDOSO']),
        size: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']),
        level_independence: z.enum(['BAIXO', 'MEDIO', 'ALTO']),
        level_environment: z.enum(['BAIXO', 'MEDIO', 'ALTO']),
        image_url: z.string().array().min(1),
        requirement: z.string().array().min(1)
    })

    const { organizationId } = registerParamsSchema.parse(req.params)

    const { about, name, age, size, level_independence, level_environment, image_url, requirement } = registerBodySchema.parse(req.body)

    const useCase = makeRegisterPetUseCase()

    try {
        await useCase.execute({
            organization_id: organizationId,
            about, name, age, size, level_independence, level_environment, image_url, requirement
        })

        reply.send().status(201)

    } catch (error) {
        return reply.status(404).send({ message: 'internal server error' })
    }
}