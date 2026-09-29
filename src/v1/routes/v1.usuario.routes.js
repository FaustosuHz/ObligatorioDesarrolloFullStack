import { Router } from "express"
import { deleteUserController, replaceUserController, updateUserController, updatePlanController } from "../controller/usuario.controller.js"
import { authMiddleware } from "../../middleware/auth.middleware.js"
import { middlewareValidatePlanBody } from "../../middleware/middlewareValidatePlanBody.js"

const userRoutes = Router();


userRoutes.patch("/plan", authMiddleware, middlewareValidatePlanBody, updatePlanController);

userRoutes.delete("/:idUser", deleteUserController);

userRoutes.patch("/:idUser", updateUserController);

userRoutes.put("/:idUser", replaceUserController);


export default userRoutes