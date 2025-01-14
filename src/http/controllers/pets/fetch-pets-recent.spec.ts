

import { app } from "@/app";
import fastify from "fastify";
import request from "supertest";

describe("fetch pets recent",()=>{

    beforeEach(async()=>{
        await app.ready()
    })

    afterAll(async()=>{
        await app.close()
    })
    
    it("should return 200 status code", async()=>{
        const response = await request(app.server).get("/pets").send()
        
        expect(response.status).toBe(200)
    })
})