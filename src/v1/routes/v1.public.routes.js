import { Router } from "express";

import { buscarLibrosExternosController } from "../controller/api-externas.controller.js";
import { describirLibroController } from "../controller/describirLibroController.js";

const publicRoutes = Router();

publicRoutes.get("/libros-externos", buscarLibrosExternosController);

publicRoutes.get("/describir-libro", describirLibroController);

export default publicRoutes;