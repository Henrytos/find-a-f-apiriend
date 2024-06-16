import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt"

import { organizationsRoutes } from "./http/controllers/organizations/routes";
import { env } from "./env";
import { petsRoutes } from "./http/controllers/pets/routes";

export const app = fastify()

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
app.register(petsRoutes

)