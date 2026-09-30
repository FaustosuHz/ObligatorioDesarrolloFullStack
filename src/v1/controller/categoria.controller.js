import { createCategoriaService, getCategoriasService, getCategoriaByIdService, updateCategoriaService, deleteCategoriaService } from "../services/categoria.service.js"

export const createCategoriaController = async (req, res) => {
    const data = req.body;
    const categoria = await createCategoriaService(data);
    return res.status(201).json(categoria);
}

export const getCategoriasController = async (req, res) => {
    const categorias = await getCategoriasService();
    return res.status(200).json(categorias);
}

export const getCategoriaByIdController = async (req, res) => {
    const { idCategoria } = req.params;
    const categoria = await getCategoriaByIdService(idCategoria);
    return res.status(200).json(categoria);
}

export const updateCategoriaController = async (req, res) => {
    const data = req.body;
    const { idCategoria } = req.params;
    const categoria = await updateCategoriaService(idCategoria, data);
    return res.status(200).json(categoria);
}

export const deleteCategoriaController = async (req, res) => {
    const { idCategoria } = req.params;
    await deleteCategoriaService(idCategoria);
    return res.status(204).send();
}