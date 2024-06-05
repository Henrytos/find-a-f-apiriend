import { makeFetchPetsFromACityUseCase } from "@/use-cases/factories/make-fetch-pets-from-a-city";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function fetchPetsByCityName(req: FastifyRequest, reply: FastifyReply) {

    const fetchPetsQuerySchema = z.object({
        cityName: z.string().min(3)
    });

    const fetchPetsBodySchema = z.object({
        age: z.enum(['FILHOTE', 'ADULTO', 'IDOSO']),
        size: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']),
        level_independence: z.enum(['BAIXO', 'MEDIO', 'ALTO']),
        level_environment: z.enum(['BAIXO', 'MEDIO', 'ALTO'])
    });

    const { cityName } = fetchPetsQuerySchema.parse(req.params);
    const petCharacteristics = fetchPetsBodySchema.safeParse(req.query);

    const useCase = makeFetchPetsFromACityUseCase()
    if (petCharacteristics.success) {
        const { pets } = await useCase.execute({
            cityName,
            petCharacteristics: petCharacteristics.data
        })
        return reply.send({ cityName, count: pets.length, pets }).status(200)
    }

    const { pets } = await useCase.execute({
        cityName
    })
    return reply.send({ count: pets.length, pets }).status(200)
}