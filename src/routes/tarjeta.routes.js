import { Router } from "express";
import {
  getTarjetas,
  postTarjeta,
  eliminarTarjeta,
} from "../controllers/tarjeta.controllers.js";

const router = Router();

router.get("/tarjetas", getTarjetas); //muestra tarjetas que no han sido asignadas
router.post("/tarjetas", postTarjeta); //crea una tarjeta
router.delete("/tarjetas/:id", eliminarTarjeta); //elimina una tarjeta

export default router;
