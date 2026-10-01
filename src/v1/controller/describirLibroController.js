import { describirLibro } from "../services/ia.service.js";

export const describirLibroController = async (req, res) => {
    const nombreLibro = req.query.nombre;

    const descripcion = await describirLibro(nombreLibro);

    return res.status(200).json({
        libro: nombreLibro,
        descripcion
    });
};