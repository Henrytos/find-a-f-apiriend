import { FastifyReply, FastifyRequest } from "fastify";

export async function SingOut(request:FastifyRequest, reply:FastifyReply){

    reply.setCookie("Authorization", "")
    reply.setCookie("refreshToken", "")

    return reply.status(200).send()
}