import { makeGetOrganizationUseCase } from "@/use-cases/factories/make-get-organization-by-id";
import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(req: FastifyRequest, reply: FastifyReply) {

    await req.jwtVerify({
        onlyCookie: true
    })

    const useCase = makeGetOrganizationUseCase()

    const { organization } = await useCase.execute({
        organizationId: req.id
    })

    const refreshToken = await reply.jwtSign({}, {
        sign: {
            sub: req.user.sub,
            expiresIn: '7d'
        }
    })


    const token = await reply.jwtSign({
        role: organization.role
    }, {
        sign: {
            sub: organization.id
        }
    })

    return reply.setCookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: true
    }).send({ token }).status(200)

}