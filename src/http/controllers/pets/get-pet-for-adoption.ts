import { NotFoundOrganizationError } from "@/use-cases/errors/not-found-organization";
import { NotFoundPetError } from "@/use-cases/errors/not-found-pet-error";
import { makeGetOrganizationUseCase } from "@/use-cases/factories/make-get-organization-by-id";
import { makeGetPetForAdoptionUseCase } from "@/use-cases/factories/make-get-pet-for-adoption";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetForAdoption(req: FastifyRequest, reply: FastifyReply) {
    const getPetParamsSchema = z.object({
        petId: z.string().uuid()
    })

    const { petId } = getPetParamsSchema.parse(req.params)

    const getPetForAdoptionUseCase = makeGetPetForAdoptionUseCase()
    const getOrganizationUseCase = makeGetOrganizationUseCase()

    try {
        const { pet } = await getPetForAdoptionUseCase.execute({
            petId
        })

        const { organization } = await getOrganizationUseCase.execute({
            organizationId: pet.organization_id
        })

        return reply.status(200).send({
            pet: {
                ...pet
            },
            organization: {
                ...organization,
                password_hash: undefined,
                email: undefined
            }
        })
    } catch (error) {
        if (error instanceof NotFoundOrganizationError) {
            return reply.status(404).send({
                message: 'Organization not found'
            })
        }
        if (error instanceof NotFoundPetError) {
            return reply.status(404).send({
                message: 'pet not found'
            })
        }
        return reply.status(500).send({
            message: 'internal server error'
        })
    }

}