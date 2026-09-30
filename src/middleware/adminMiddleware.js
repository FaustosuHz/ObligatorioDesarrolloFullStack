export const adminMiddleware = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            error: "No tienes permisos para realizar esta acción"
        });
    }

    next();

};