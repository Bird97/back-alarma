import { Router } from "express";
import {
  activarAlarma,
  desactivarAlarma,
} from "../controllers/alarma.controllers.js";

const router = Router();

router.get("/activarAlarma", activarAlarma); //asigna la marca de control
router.get("/desactivarAlarma", desactivarAlarma); //asigna la marca de control

export default router;
