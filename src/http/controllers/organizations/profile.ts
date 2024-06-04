import { makeGetOrganizationUseCase } from "@/use-cases/factories/make-get-organization-by-id";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(req: FastifyRequest, reply: FastifyReply) {
    await req.jwtVerify()

    const useCase = makeGetOrganizationUseCase()
    const { organization } = await useCase.execute({
        organizationId: req.user.sub
    })

    return reply.send({ ...organization, password_hash: undefined }).status(200)
}