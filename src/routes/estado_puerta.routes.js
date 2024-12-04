import { Router } from "express";
import {
  abrirPuerta,
  cerrarPuerta,
  devolverEstado,
} from "../controllers/estado_puerta.controllers.js";

const router = Router();

router.get("/abrirPuertaEstado", abrirPuerta); //asigna la marca de control
router.get("/cerrarPuertaEstado", cerrarPuerta); //asigna la marca de control
router.get("/controlPuertaEstado", devolverEstado); //asigna la marca de control

export default router;
