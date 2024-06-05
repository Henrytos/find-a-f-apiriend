import { FastifyInstance } from "fastify";
import { fetchPetsByCityName } from "./fetch-pets";
import { register } from "./register";
import { jwtVerify } from "@/http/middlewares/verify-jwt";
import { jwtVerifyRole } from "@/http/middlewares/verify-jwt-role";
import { getPetForAdoption } from "./get-pet-for-adoption";


export async function petsRoutes(app: FastifyInstance) {
    app.post('/pets', { onRequest: [jwtVerify, jwtVerifyRole('ORG')] }, register)
    app.get('/pets/:cityName', fetchPetsByCityName)
    app.get('/pets-adoption/:petId', getPetForAdoption)
}