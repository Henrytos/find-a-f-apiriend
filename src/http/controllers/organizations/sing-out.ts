import { FastifyReply, FastifyRequest } from "fastify";

export async function SingOut(request:FastifyRequest, reply:FastifyReply){

    reply.setCookie("Authorization", "")

    return reply.status(200).send()
}