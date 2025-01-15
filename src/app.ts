import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";

import { organizationsRoutes } from "./http/controllers/organizations/routes";
import { petsRoutes } from "./http/controllers/pets/routes";
import cors from"@fastify/cors"
import fastifyJwt from "@fastify/jwt";
import {env} from "./env"

export const app = fastify()

app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization', 'Cookie'],
    credentials: true
    
})

app.register(fastifyJwt, {
    secret: env.JWT_SECRET_KEY,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})


app.register(fastifyCookie)
app.register(organizationsRoutes)
app.register(petsRoutes)