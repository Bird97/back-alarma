import { Router } from "express";
import {
  controlEntrada,
  TablaControl,
} from "../controllers/control_entrada.controllers.js";

const router = Router();

router.get("/control/:id", controlEntrada); //asigna la marca de control
router.get("/control", TablaControl); //asigna la marca de control

export default router;
