import { FastifyInstance } from "fastify";
import { fetchPetsByCityName } from "./fetch-pets";
import { register } from "./register";
import { jwtVerify } from "@/http/middlewares/verify-jwt";
import { jwtVerifyRole } from "@/http/middlewares/verify-jwt-role";


export async function petsRoutes(app: FastifyInstance) {
    app.get('/pets', fetchPetsByCityName)
    app.post('/pets', { onRequest: [jwtVerify, jwtVerifyRole('ORG')] }, register)

}