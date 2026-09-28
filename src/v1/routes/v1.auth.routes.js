import { Router } from "express"
import { loginController, registerController } from "../controller/auth.controller.js";
import { middlewareValidateLoginBody, middlewareValidateRegisterBody } from "../../middleware/auth.middleware.js";
import { loginRateLimitMiddleware } from "../../middleware/rate-limit.middleware.js";


const authRoutes = Router();

authRoutes.post("/login", loginRateLimitMiddleware, middlewareValidateLoginBody, loginController);
authRoutes.post("/register", middlewareValidateRegisterBody, registerController);

export default authRoutes