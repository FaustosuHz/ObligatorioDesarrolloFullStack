import { verifyAccessToken } from "../utils/token.util.js";


export const authMiddleware = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).
                json({ error: "No se se recibio token" });
        }

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Token no proporcionado"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = verifyAccessToken(token);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).
            json({ error: "Invalid token" });
    }
};


export const middlewareValidateLoginBody = (req, res, next) => {

    const { identificador, password } = req.body;

    if (!identificador || !password) {
        return res.status(400).json({
            error: "Identificador y password son requeridos"
        });
    }

    next();

};


export const middlewareValidateRegisterBody = (req, res, next) => {

    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).json({
            error: "Todos los campos son requeridos"
        });
    }

    next();

};