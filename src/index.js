import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import bodyParser from "body-parser";
import usuarioRoutes from "./routes/usuarios.routes.js";
import controlRoutes from "./routes/control_entrada.routes.js";
import tarjetaRoutes from "./routes/tarjeta.routes.js";
import puertaRoutes from "./routes/puerta.routes.js";
import alarmaRoutes from "./routes/alarma.routes.js";
import estado_alarmaRoutes from "./routes/estado_alarma.routes.js";
import estado_puertaRoutes from "./routes/estado_puerta.routes.js";

const app = express();

// const corsOptions = {
//   origin: "https://backlocal.fly.dev", // Permitir solicitudes desde este origen
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: ["Content-Type", "Authorization"], // Permitir estas cabeceras
// };

//app.use(cors(corsOptions));
const hostname = "0.0.0.0";
app.use(bodyParser.json());
app.use(usuarioRoutes);
app.use(controlRoutes);
app.use(tarjetaRoutes);
app.use(puertaRoutes);
app.use(alarmaRoutes);
app.use(estado_alarmaRoutes);
app.use(estado_puertaRoutes);

app.listen(PORT, hostname, () => {
  console.log("Server listen on port ", PORT);
});
