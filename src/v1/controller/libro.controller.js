import { createLibroService, deleteLibroService, getLibrosService, getLibroByIdService, getLibrosByUserService, getLibrosByCategoriaService, updateLibroService } from "../services/libro.services.js";


export const getLibrosController = async (req, res) => {
    try {
        const libros = await getLibrosService();
        return res.status(200).json(libros);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getLibroByIdController = async (req, res) => {
    try {
        const { idLibro } = req.params;
        const libro = await getLibroByIdService(idLibro);

        return res.status(200).json(libro);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

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

export const getLibrosByCategoriaController = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const libros = await getLibrosByCategoriaService(categoryId);

        return res.status(200).json(libros);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createLibroController = async (req, res) => {
    try {
        const data = {
            ...req.body,
            userId: req.user.id
        };

        const libro = await createLibroService(data);

        return res.status(201).json(libro);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteLibroController = async (req, res) => {
    const { idLibro } = req.params;

    await deleteLibroService(idLibro);

    return res.status(204).send();
};

export const updateLibroController = async (req, res) => {
    try {
        const { idLibro } = req.params;
        const data = req.body;

        const libro = await updateLibroService(idLibro, data);

        return res.status(200).json(libro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};