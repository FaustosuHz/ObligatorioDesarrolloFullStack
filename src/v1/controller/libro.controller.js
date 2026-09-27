import {
    createLibroService,
    deleteLibroService,
    getAllLibrosService,
    getLibroByIdService,
    getLibrosByUserService,
    replaceLibroService,
    updateLibroService
} from "../services/libro.services.js";


// get all

export const getLibrosController = async (req, res) => {
    try {
        const libros = await getAllLibrosService();
        return res.status(200).json(libros);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// get by id

export const getLibroByIdController = async (req, res, next) => {
    try {
        const { idLibro } = req.params;
        const libro = await getLibroByIdService(idLibro);

        if (!libro) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        return res.status(200).json(libro);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// get by user id

export const getLibrosByUserController = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(404).json({ message: "No se pudo encontrar el usuario" });
        }

        const libros = await getLibrosByUserService(userId);
        return res.status(200).json(libros);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// crear

export const createLibroController = async (req, res) => {
    try {
        const data = req.body;
        const libro = await createLibroService(data);
        return res.status(201).json(libro);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// delete

export const deleteLibroController = async (req, res) => {
    const { idLibro } = req.params;

    await deleteLibroService(idLibro);

    return res.status(204).send();
};


// update

export const updateLibroController = async (req, res) => {
    try {
        const { idLibro } = req.params;
        const data = req.body;

        const libro = await updateLibroService(idLibro, data);

        if (!libro) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        return res.status(200).json(libro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// replace

export const replaceLibroController = async (req, res) => {
    try {
        const { idLibro } = req.params;
        const data = req.body;

        const libro = await replaceLibroService(idLibro, data);

        if (!libro) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        return res.status(200).json(libro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};