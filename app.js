import express from "express";
import "dotenv/config";
import { connectMongo } from "./src/v1/config/mongo.config.js";
import apiRoutes from "./src/v1/routes/index.js";
import { middlewareErrores } from "./src/middleware/error.middleware.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: ['http://localhost:5000', 'http://localhost:5500'],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    maxAge: 86400
}));

app.use(express.json({ limit: "10mb" }));

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