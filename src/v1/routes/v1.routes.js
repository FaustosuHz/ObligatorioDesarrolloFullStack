
import { Router } from "express"
import usuarioRoutes from "./v1.usuario.routes.js"
import librosRoutes from "./v1.libro.routes.js"
import authRoutes from "./v1.auth.routes.js";


const v1Routes = Router()

v1Routes.use("/auth", authRoutes)

v1Routes.use("/usuario", usuarioRoutes)
v1Routes.use("/libros", librosRoutes)

export default v1Routes

