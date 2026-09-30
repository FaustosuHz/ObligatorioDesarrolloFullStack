import { Router } from "express"
import { deleteUserController, updateUserController, updatePlanController, getUserByIdController, getUsersController } from "../controller/usuario.controller.js"
import { authMiddleware } from "../../middleware/auth.middleware.js"
import { middlewareValidatePlanBody } from "../../middleware/middlewareValidatePlanBody.js"
import { middlewareValidateUpdateUserBody  } from "../../middleware/middlewareValidateUpdateUserBody.js";

const userRoutes = Router();


userRoutes.get("/:idUser", authMiddleware, getUserByIdController);

userRoutes.get("/", authMiddleware, getUsersController);

userRoutes.patch("/plan", authMiddleware, middlewareValidatePlanBody, updatePlanController);

userRoutes.delete("/:idUser", deleteUserController);

userRoutes.put("/:idUser", authMiddleware, middlewareValidateUpdateUserBody, updateUserController);




export default userRoutes