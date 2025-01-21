import { FastifyReply, FastifyRequest } from "fastify";

export async function SingOut(request:FastifyRequest, reply:FastifyReply){

    reply.clearCookie("accessToken")
    reply.clearCookie("refreshToken")

    return reply.status(200).send()
}