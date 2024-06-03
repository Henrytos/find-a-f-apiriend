import { NotFoundOrganizationError } from "@/use-cases/errors/not-found-organization";
import { makeGetOrganizationByEmailAndPasswordUseCase } from "@/use-cases/factories/make-get-organization-by-email-and-password";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {

    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const { email, password } = authenticateBodySchema.parse(req.body)

    const useCase = makeGetOrganizationByEmailAndPasswordUseCase()

    try {
        const { organization } = await useCase.execute({
            email,
            password
        })

        if (!organization) {
            return reply.status(501).send()
        }

        const token = await reply.jwtSign({
            sub: {
                id: organization.id
            }
        }, {
        })

        return reply.send({ token }).status(200)
    } catch (error) {
        if (error instanceof NotFoundOrganizationError) {
            return reply.status(404).send()
        }
        return reply.status(500).send()
    }
}