import { app } from "./app";
import { env } from "./env";

app.listen({
    port: env.PORT
}).then(() => {
    console.log(`🚀 listening on port: ${env.PORT} 🚀`)
    console.log(`��� HELLO WORLD ��`)   
})

