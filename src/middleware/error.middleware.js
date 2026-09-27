import { constructorError } from "../utils/contructor.error"



export const errorMiddleware = (err, req, res, next) => {

    const mensajeError = err.message ?? "Error desconocido";
    const statusError = err.status ?? 500;


    //next(errorGenerado); //busca otro middleware de error

    return res.status(statusError).json({
        mensaje: mensajeError
    }) //termina la ejecucion

    // next()//este busca un middleware comun o una ruta si la hubiera


}

