import { Router } from "express";
import {
  controlPuerta,
  abrirPuerta,
  tablaPuerta,
} from "../controllers/puerta.controllers.js";

const router = Router();

router.get("/controlPuerta", controlPuerta); //asigna la marca de control
router.get("/abrirPuerta", abrirPuerta); //asigna la marca de control
router.get("/tablaPuerta", tablaPuerta); //asigna la marca de control

export default router;
