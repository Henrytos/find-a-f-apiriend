import { FastifyReply, FastifyRequest } from "fastify";

export function jwtVerifyRole(roleVerify: 'ORG') {
    return async (req: FastifyRequest, reply: FastifyReply) => {
        const { role } = req.user
        if (role != roleVerify) {
            return reply.status(401).send()
        }

    }
}