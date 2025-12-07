// routes/proyectoRoutes.js  (por si lo quieres conectado ya)
import { Router } from "express";
import {
  listarProyectos,
  crearProyecto,
  eliminarProyecto,
} from "../controllers/proyectoController.js";

const router = Router();

router.get("/proyectos", listarProyectos);
router.post("/proyectos", crearProyecto);
router.delete("/proyectos/:id", eliminarProyecto);

export default router;