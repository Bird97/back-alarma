import { Router } from "express";
import {
  getUsuarios,
  getUsuarioPorId,
  postUsuario,
  agregarTarjeta,
  eliminarUsuario,
  devolverIdUsuario,
  existeLaTarjeta,
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.get("/usuarios", getUsuarios); //devuelve usuario
router.get("/usuarios/:id", getUsuarioPorId); //devuelve un usuario por su id
router.post("/usuarios", postUsuario); //crea un usuario
router.post("/agregar-tarjeta", agregarTarjeta); //asigna tarjeta a usuario
router.delete("/usuarios/:id", eliminarUsuario);
router.get("/idusuario/:cid", devolverIdUsuario); //devuelve id usuario por su card id
router.get("/existe/:cid", existeLaTarjeta); //te dice si existe o no la tarjeta

export default router;
