import express from "express";
import "dotenv/config";
import { connectMongo } from "./src/v1/config/mongo.config.js";
import apiRoutes from "./src/v1/routes/index.js";
import { middlewareErrores } from "./src/middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    console.log("Servidor disponible");
    res.status(200).json({
        message: "Servidor disponible"
    });
});

app.use(
    "/api",
    async (req, res, next) => {
        try {
            await connectMongo();
            next();
        } catch (error) {
            next(error);
        }
    },
    apiRoutes
);

app.use(middlewareErrores);

if (process.env.NODE_ENV !== "production") {
    app.listen(process.env.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    });
}

export default app;