import { Router } from "express"

import { createLibroController, deleteLibroController, updateLibroController, getLibrosController, getLibroByIdController, getLibrosByUserController, getLibrosByCategoriaController } from "../controller/libro.controller.js"

import { authMiddleware } from "../../middleware/auth.middleware.js"
import { middlewareValidateCreateLibroBody } from "../../middleware/middlewareValidateCreateLibroBody.js"
import { middlewareValidateUpdateLibroBody } from "../../middleware/middlewareValidateUpdateLibroBody.js"
import { middlewareValidateLibroParams } from "../../middleware/middlewareValidateLibroParams.js"
import { middlewareValidateCategoriaParams } from "../../middleware/middlewareValidateCategoriaParams.js"

const librosRoutes = Router();

librosRoutes.post("/", authMiddleware, middlewareValidateCreateLibroBody, createLibroController);

librosRoutes.get("/", authMiddleware, getLibrosController);

librosRoutes.get("/usuario", authMiddleware, getLibrosByUserController);

librosRoutes.get("/categoria/:categoryId", authMiddleware, middlewareValidateCategoriaParams, getLibrosByCategoriaController);

librosRoutes.get("/:idLibro", authMiddleware, middlewareValidateLibroParams, getLibroByIdController);

librosRoutes.delete("/:idLibro", authMiddleware, middlewareValidateLibroParams, deleteLibroController);

librosRoutes.put("/:idLibro", authMiddleware, middlewareValidateLibroParams, middlewareValidateUpdateLibroBody, updateLibroController);

export default librosRoutes