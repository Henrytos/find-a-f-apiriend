import { app } from "./app";
import { env } from "./env";

app.listen({
    port: env.PORT
}).then(() => {
    console.log(`🚀 listening on porttttttt: ${env.PORT} 🚀`)
})

