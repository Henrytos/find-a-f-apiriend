import fastify from "fastify";

export const app = fastify()

app.get('/hello', async (request, reply) => {
    return reply.send({ message: 'Hello World' }).status(200)
})