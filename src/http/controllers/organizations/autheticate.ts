// import { makeGetOrganizationUseCase } from "@/use-cases/factories/make-get-organization";
// import { FastifyReply, FastifyRequest } from "fastify";
// import { z } from "zod";

// export async function authenticate(req: FastifyRequest, reply: FastifyReply) {

//     const authenticateBodySchema = z.object({
//         email: z.string().email(),
//         password: z.string()
//     })
//     const useCase = makeGetOrganizationUseCase()
//     const { organition } = useCase.execute({

//     })

//     const token = await reply.jwtSign({}, {
//         sign: {
//             sub: {
//                 id: organization.id
//             }
//         }
//     })
// }