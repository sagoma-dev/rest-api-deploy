import express, { json } from "express"; // require -> commonJS
import { moviesRouter } from "./routes/movies.js";

// Cuando llegue la nueva especificacion la importacion de json sera asi:
// import movies from "./movies.json" with { type: "json" } ;
//importar un json en ESModules
// import fs from "node:fs";
// const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));

import { createRequire } from "node:module";
import { corsMiddleware } from "./middlewares/cors.js";
const require = createRequire(import.meta.url);
const movies = require("./movies.json");

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by"); // deshabilitar el header X-Powered-By: Express

// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS

app.use("/movies", moviesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
