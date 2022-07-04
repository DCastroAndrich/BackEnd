import { Application, config } from "./deps.ts";
import { router } from "./src/routes/color.routes.ts";


const app = new Application();

app.use(router.routes())

const { PORT } = config();
app.listen({ port: Number(PORT) });
console.log(`Server listen on port: ${PORT}`);


