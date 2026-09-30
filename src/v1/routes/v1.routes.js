
import { Router } from "express"
import usuarioRoutes from "./v1.usuario.routes.js"
import libroRoutes from "./v1.libro.routes.js"
import categoriaRoutes from "./v1.categoria.routes.js"
import authRoutes from "./v1.auth.routes.js";


const v1Routes = Router()

v1Routes.use("/auth", authRoutes)

v1Routes.use("/usuario", usuarioRoutes)
v1Routes.use("/categoria", categoriaRoutes)
v1Routes.use("/libro", libroRoutes)

export default v1Routes

