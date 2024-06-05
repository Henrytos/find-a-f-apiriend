import { FastifyInstance } from "fastify";
import { fetchPetsByCityName } from "./fetch-pets";
import { register } from "./register";


export async function petsRoutes(app: FastifyInstance) {
    app.get('/pets', fetchPetsByCityName)
    app.post('/:organizationId/pets', register)

}