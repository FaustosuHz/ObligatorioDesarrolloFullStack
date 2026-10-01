import mongoose from "mongoose";
import Libro from "../models/libros.model.js";
import Usuario from "../models/usuario.model.js";
import Categoria from "../models/categoria.model.js";

export const createLibroService = async (data) => {

    const usuario = await Usuario.findById(data.userId);

    if (!usuario) {
        const error = new Error("El usuario no existe");
        error.status = 404;
        throw error;
    }

    const categoria = await Categoria.findById(data.categoryId);

    if (!categoria) {
        const error = new Error("La categoría no existe");
        error.status = 404;
        throw error;
    }

    const cantidadLibros = await Libro.countDocuments({
        userId: data.userId
    });

    if (usuario.plan === "plus" && cantidadLibros >= 4) {
        const error = new Error("El plan Plus permite agregar hasta 4 libros");
        error.status = 400;
        throw error;
    }

    return await Libro.create(data);

}

export const getLibrosService = async () => {

    return await Libro.find();

}

export const getLibroByIdService = async (id) => {

    if (!mongoose.isValidObjectId(id)) {
        const error = new Error("El ID del libro no es válido");
        error.status = 400;
        throw error;
    }

    const libro = await Libro.findById(id);

    if (!libro) {
        const error = new Error("El libro no existe");
        error.status = 404;
        throw error;
    }

    return libro;

}

export const getLibrosByUserService = async (userId) => {

    if (!mongoose.isValidObjectId(userId)) {
        const error = new Error("El ID del usuario no es válido");
        error.status = 400;
        throw error;
    }

    const usuario = await Usuario.findById(userId);

    if (!usuario) {
        const error = new Error("El usuario no existe");
        error.status = 404;
        throw error;
    }

    return await Libro.find({ userId });

}

export const getLibrosByCategoriaService = async (categoryId) => {

    if (!mongoose.isValidObjectId(categoryId)) {
        const error = new Error("El ID de la categoría no es válido");
        error.status = 400;
        throw error;
    }

    const categoria = await Categoria.findById(categoryId);

    if (!categoria) {
        const error = new Error("La categoría no existe");
        error.status = 404;
        throw error;
    }

    return await Libro.find({ categoryId });

}

export const updateLibroService = async (id, data) => {

    if (!mongoose.isValidObjectId(id)) {
        const error = new Error("El ID del libro no es válido");
        error.status = 400;
        throw error;
    }

    const libro = await Libro.findById(id);

    if (!libro) {
        const error = new Error("El libro no existe");
        error.status = 404;
        throw error;
    }

    const categoria = await Categoria.findById(data.categoryId);

    if (!categoria) {
        const error = new Error("La categoría no existe");
        error.status = 404;
        throw error;
    }

    return await Libro.findByIdAndUpdate(id, data, { new: true });

}

export const deleteLibroService = async (id) => {

    if (!mongoose.isValidObjectId(id)) {
        const error = new Error("El ID del libro no es válido");
        error.status = 400;
        throw error;
    }

    const libro = await Libro.findById(id);

    if (!libro) {
        const error = new Error("El libro no existe");
        error.status = 404;
        throw error;
    }

    return await Libro.findByIdAndDelete(id);

}