import { FastifyInstance } from "fastify";
import { fetchPetsByCityName } from "./fetch-pets-by-city-name";


export async function petsRoutes(app: FastifyInstance) {
    app.get('/pets', fetchPetsByCityName)
}