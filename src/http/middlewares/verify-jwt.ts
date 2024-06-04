import { FastifyReply, FastifyRequest } from "fastify";

export async function jwtVerify(req: FastifyRequest, reply: FastifyReply) {
    await req.jwtVerify()
}