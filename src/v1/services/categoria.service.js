import Categoria from "../models/categoria.model.js";
import Libro from "../models/libros.model.js";
import mongoose from "mongoose";

export const createCategoriaService = async (data) => {

    const categoriaExistente = await Categoria.findOne({ name: data.name });

    if (categoriaExistente) {
        const error = new Error("La categoría ya existe");
        error.status = 409;
        throw error;
    }

    return await Categoria.create(data);
}

export const getCategoriasService = async () => {
    return await Categoria.find();
}

export const getCategoriaByIdService = async (id) => {

    const categoria = await Categoria.findById(id);

    if (!categoria) {
        const error = new Error("La categoría no existe");
        error.status = 404;
        throw error;
    }

    return categoria;

}

export const updateCategoriaService = async (id, data) => {

    if (!mongoose.isValidObjectId(id)) {
        const error = new Error("El ID de la categoría no es válido");
        error.status = 400;
        throw error;
    }

    const categoria = await Categoria.findById(id);

    if (!categoria) {
        const error = new Error("La categoría no existe");
        error.status = 404;
        throw error;
    }

    const categoriaExistente = await Categoria.findOne({
        name: data.name,
        _id: { $ne: id }
    });

    if (categoriaExistente) {
        throw new Error("La categoría ya existe");
    }

    return await Categoria.findByIdAndUpdate(id, data, { new: true });

}

export const deleteCategoriaService = async (id) => {

    if (!mongoose.isValidObjectId(id)) {
        const error = new Error("El ID de la categoría no es válido");
        error.status = 400;
        throw error;
    }

    const categoria = await Categoria.findById(id);

    if (!categoria) {
        const error = new Error("La categoría no existe");
        error.status = 404;
        throw error;
    }

    const libro = await Libro.findOne({ categoryId: id });

    if (libro) {
        const error = new Error("No se puede eliminar la categoría porque tiene libros asignados");
        error.status = 400;
        throw error;
    }

    return await Categoria.findByIdAndDelete(id);

}