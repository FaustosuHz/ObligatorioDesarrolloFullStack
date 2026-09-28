import { verifyAccessToken } from "../utils/token.util.js";

import { registerBodySchema } from "../validators/register-body.schema.js";
import { loginBodySchema } from "../validators/login-body.schema.js";


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

    const { error, value } = loginBodySchema.validate(req.body, {
        abortEarly: false
    });

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    req.body = value;

    next();

};


export const middlewareValidateRegisterBody = (req, res, next) => {

    const { error, value } = registerBodySchema.validate(req.body, {
        abortEarly: false
    });

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    req.body = value;

    next();

};