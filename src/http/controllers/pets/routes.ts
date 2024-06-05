import { FastifyInstance } from "fastify";
import { fetchPetsByCityName } from "./fetch-pets";


export async function petsRoutes(app: FastifyInstance) {
    app.get('/pets', fetchPetsByCityName)
}