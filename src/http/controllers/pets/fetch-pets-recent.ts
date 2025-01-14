import { makeFetchPetsRecentUseCase } from "@/use-cases/factories/make-fetch-pets-recent-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchPetsRecent(request: FastifyRequest, reply:FastifyReply){
    const queryParamsSchema = z.object({
        page: z.coerce.number().int().positive().optional().default(1),
        perPage: z.coerce.number().int().positive().optional().default(10)
    })

    const { page, perPage } = queryParamsSchema.parse(request.query)

    const fetchPetsRecentUseCase = makeFetchPetsRecentUseCase()

    const { pets} = await fetchPetsRecentUseCase.execute({ page, perPage })

    return reply.status(200).send({ count: pets.length, pets })
}