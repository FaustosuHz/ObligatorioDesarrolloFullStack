import { rateLimit } from "express-rate-limit";

/*
 * Límite general para toda la API.
 *
 * Cada IP puede hacer hasta 100 peticiones cada 15 minutos.
 */
export const apiRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,

    limit: 100,

    standardHeaders: true,

    legacyHeaders: false,

    handler: (req, res) => {
        return res.status(429).json({
            message:
                "Demasiadas peticiones. Intente nuevamente más tarde."
        });
    }
});

/*
 * Límite para el inicio de sesión.
 *
 * Cada IP puede hacer hasta 20 intentos durante 15 minutos.
 */
export const loginRateLimitMiddleware = rateLimit({
    windowMs: 15 * 60 * 1000,

    limit: 20,

    standardHeaders: true,

    legacyHeaders: false,

    skipSuccessfulRequests: false,

    handler: (req, res) => {
        return res.status(429).json({
            message:
                "Demasiados intentos de inicio de sesión. Intente nuevamente en 15 minutos."
        });
    }
});