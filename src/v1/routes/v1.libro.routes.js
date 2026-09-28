//routes/v1/libros.routes.js

import { Router } from "express"

import { createLibroController, deleteLibroController, replaceLibroController, updateLibroController } from "../controller/libro.controller.js"



const librosRoutes = Router();

librosRoutes.post("/", createLibroController);

librosRoutes.delete("/:idLibro", deleteLibroController);

librosRoutes.patch("/:idLibro", updateLibroController);

librosRoutes.put("/:idLibro", replaceLibroController);



export default librosRoutes