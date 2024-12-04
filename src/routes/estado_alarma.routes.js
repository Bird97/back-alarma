import { Router } from "express";
import {
  encenderalarma,
  apagarAlarma,
  devolverEstado,
} from "../controllers/estado_alarma.controllers.js";

const router = Router();

router.get("/encenderAlarmaEstado", encenderalarma); //asigna la marca de control
router.get("/apagarAlarmaEstado", apagarAlarma); //asigna la marca de control
router.get("/controlAlarmaEstado", devolverEstado); //asigna la marca de control

export default router;
