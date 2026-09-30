import { Router } from "express"
import { createCategoriaController, getCategoriasController, getCategoriaByIdController, updateCategoriaController, deleteCategoriaController } from "../controller/categoria.controller.js"
import { authMiddleware } from "../../middleware/auth.middleware.js"
import { adminMiddleware } from "../../middleware/adminMiddleware.js"
import { middlewareValidateCategoriaBody } from "../../middleware/middlewareValidateCategoriaBody.js"

const categoriaRoutes = Router();

categoriaRoutes.post("/", authMiddleware, adminMiddleware, middlewareValidateCategoriaBody, createCategoriaController);

categoriaRoutes.get("/", authMiddleware, adminMiddleware, getCategoriasController);

categoriaRoutes.get("/:idCategoria", authMiddleware, adminMiddleware, getCategoriaByIdController);

categoriaRoutes.put("/:idCategoria", authMiddleware, adminMiddleware, middlewareValidateCategoriaBody, updateCategoriaController);

categoriaRoutes.delete("/:idCategoria", authMiddleware, adminMiddleware, deleteCategoriaController);

export default categoriaRoutes