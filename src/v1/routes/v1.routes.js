
import { Router } from "express"
import userRoutes from "./v1.user.routes.js"
import tareasRoutes from "./v1.tarea.routes.js"
import authRoutes from "./v1.auth.routes.js";


const v1Routes = Router()

v1Routes.use("/auth", authRoutes);

v1Routes.use("/usuario", userioRoutes)
v1Routes.use("/libros", librosRoutes)

export default v1Routes

