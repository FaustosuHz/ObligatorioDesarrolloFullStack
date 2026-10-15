import mongoose from "mongoose";
import Libro from "../models/libros.model.js";
import Usuario from "../models/usuario.model.js";
import Categoria from "../models/categoria.model.js";
import { generarKeyRedisLibrosUserPaginado } from "../../utils/generar-key-redis.js";
import { obtenerDato, guardarDato, eliminarDatosPorPatron } from "../services/redis.service.js";

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

    const libro = await Libro.create(data);

    // borra el caché de libros de ese usuario
    await eliminarDatosPorPatron(`user:libros:${data.userId}*`);

    return libro;

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

    const libroActualizado = await Libro.findByIdAndUpdate(id, data, { new: true });

    // borra el caché de libros de ese usuario
    await eliminarDatosPorPatron(`user:libros:${libro.userId}*`);

    return libroActualizado;

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

    const libroEliminado = await Libro.findByIdAndDelete(id);

    // borra el caché de libros de ese usuario
    await eliminarDatosPorPatron(`user:libros:${libro.userId}*`);

    return libroEliminado;

}

export const getLibrosByUserServicePaginated = async (userId, { pagina, limite }) => {

    if (!mongoose.isValidObjectId(userId)) {
        const error = new Error("El ID del usuario no es válido");
        error.status = 400;
        throw error;
    }

    const keyRedis = generarKeyRedisLibrosUserPaginado(userId, pagina, limite);

    // primero pregunta en redis
    const librosRedis = await obtenerDato(keyRedis);
    if (librosRedis) {
        console.log("Encontro en redis los libros paginados");
        return librosRedis;
    }

    const usuario = await Usuario.findById(userId);

    if (!usuario) {
        const error = new Error("El usuario no existe");
        error.status = 404;
        throw error;
    }

    const filtro = { userId };

    const [libros, total] = await Promise.all([
        Libro.find(filtro)
            .sort({ _id: -1 })
            .skip((pagina - 1) * limite)
            .limit(limite)
            .populate("userId", "name email")
            .populate("categoryId"),
        Libro.countDocuments(filtro)
    ]);

    const resultado = {
        libros,
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite)
    };

    // si no estaba, lo guarda en redis
    guardarDato(keyRedis, resultado);
    console.log("Busco los libros paginados desde mongo");

    return resultado;
}