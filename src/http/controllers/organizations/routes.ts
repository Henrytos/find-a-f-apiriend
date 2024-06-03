import { FastifyInstance } from "fastify";
import { register } from "./register";


export async function organizationsRoutes(app: FastifyInstance) {
    app.post('/organizations', register)
}