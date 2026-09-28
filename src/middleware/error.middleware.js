export const middlewareErrores = (err, req, res, next) => {

    const mensajeError = err.message ?? "Error desconocido";
    const statusError = err.status ?? 500;

    return res.status(statusError).json({
        mensaje: mensajeError
    });

}