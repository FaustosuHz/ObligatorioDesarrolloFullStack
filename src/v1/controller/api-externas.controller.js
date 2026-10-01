import { buscarLibrosExternosService } from "../services/api-externa.service.js";

export const buscarLibrosExternosController = async (req, res) => {
    const titulo = req.query.titulo;

    const libros = await buscarLibrosExternosService(titulo);

    return res.status(200).json(libros);
};