import { NotFoundOrganizationError } from "@/use-cases/errors/not-found-organization";
import { makeAuthenticateOrganizationUseCase } from "@/use-cases/factories/make-authenticate-organization";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {

    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const { email, password } = authenticateBodySchema.parse(req.body)

    const useCase = makeAuthenticateOrganizationUseCase()

    try {
        const { organization } = await useCase.execute({
            email,
            password
        })

        console.log({organization})

        const refreshToken = await reply.jwtSign({}, {
            sign: {
                sub: organization.id,
                expiresIn: '7d'
            }
        })

        const token = await reply.jwtSign({
            role: "ORG"
        }, {
            sign: {
                sub: organization.id,
                expiresIn: '10m'
            }
        })

        return reply.setCookie('refreshToken', refreshToken, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).send({ token })

        

    } catch (error) {
        if (error instanceof NotFoundOrganizationError) {
            return reply.status(404).send()
        }
        return reply.status(500).send()
    }
}