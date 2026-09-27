//routes/v1/users.routes.js
import { Router } from "express"
import { createTareaController, deleteTareaController, replaceTareaController, updateTareaController } from "../controller/todo.controller.js";


const tareasRoutes = Router();

tareasRoutes.post("/", createTareaController);
tareasRoutes.delete("/:idTarea", deleteTareaController);
tareasRoutes.patch("/:idTarea", updateTareaController);
tareasRoutes.put("/:idTarea", replaceTareaController);


export default tareasRoutes
