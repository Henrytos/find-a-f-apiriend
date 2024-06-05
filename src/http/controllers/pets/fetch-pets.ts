import { makeFetchPetsFromACityUseCase } from "@/use-cases/factories/make-fetch-pets-from-a-city";
import { $Enums } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function fetchPetsByCityName(req: FastifyRequest, reply: FastifyReply) {
    const fetchPetsParamsSchema = z.object({
        cityName: z.string().min(3)
    });

    const fetchPetsBodySchema = z.object({
        age: z.enum(['FILHOTE', 'ADULTO', 'IDOSO']).optional(),
        size: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']).optional(),
        level_independence: z.enum(['BAIXO', 'MEDIO', 'ALTO']).optional(),
        level_environment: z.enum(['BAIXO', 'MEDIO', 'ALTO']).optional()
    });

    const { cityName } = fetchPetsParamsSchema.parse(req.params);
    const { age, level_environment, level_independence, size } = fetchPetsBodySchema.parse(req.body);

    const useCase = makeFetchPetsFromACityUseCase()
    if (age && level_environment && level_independence && size) {
        const { pets } = await useCase.execute({
            cityName,
            petCharacteristics: {
                age,
                level_environment,
                level_independence,
                size
            }
        })
        return reply.send({ pets }).status(200)
    }
    const { pets } = await useCase.execute({
        cityName
    })
    return reply.send({ pets }).status(200)
}