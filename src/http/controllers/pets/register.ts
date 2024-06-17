import { makeRegisterPetUseCase } from "@/use-cases/factories/make-register-pet";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {

    const registerBodySchema = z.object({
        name: z.string(),
        about: z.string(),
        age: z.enum(['FILHOTE', 'ADULTO', 'IDOSO']),
        size: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']),
        level_independence: z.enum(['BAIXO', 'MEDIO', 'ALTO']),
        level_environment: z.enum(['BAIXO', 'MEDIO', 'ALTO']),
        image_url: z.string().array().min(1),
        requirement: z.string().array().min(1)
    })



    const { about, name, age, size, level_independence, level_environment, image_url, requirement } = registerBodySchema.parse(req.body)

    const useCase = makeRegisterPetUseCase()
    try {
        await useCase.execute({
            organization_id: req.user.sub,
            about, name, age, size, level_independence, level_environment, image_url, requirement
        })

        reply.status(201).send()

    } catch (error) {
        console.log(error)
        return reply.status(404).send({ message: 'internal server error' })
    }
}