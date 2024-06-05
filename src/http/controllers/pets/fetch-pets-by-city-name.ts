import { makeFetchPetsFromACityUseCase } from "@/use-cases/factories/make-fetch-pets-from-a-city";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchPetsByCityName(req: FastifyRequest, reply: FastifyReply) {
    const petsParamsSchema = z.object({
        cityName: z.string().min(3)

    });
    const useCase = makeFetchPetsFromACityUseCase()
}