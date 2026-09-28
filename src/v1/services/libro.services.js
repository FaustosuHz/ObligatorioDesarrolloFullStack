import Libro from "../models/libros.model.js";


export const getAllLibrosService = async () => {

    return await Libro.find().populate("userId", "name email");

};

// getbyid

export const getLibroByIdService = async (id) => {

    return await Libro.findById(id).populate("userId", "name email");

};

// getbyuserid

export const getLibrosByUserService = async (userId) => {

    return await Libro.find({ userId }).populate("userId", "name email");

};

// getbycompleted

export const getLibrosByCompletedService = async (completed) => {

    return await Libro.find({ completed }).populate("userId", "name email");

};

// getbytitle

export const getLibrosByTitleService = async (title) => {

    return await Libro.find({ title: { $regex: title, $options: "i" } }).populate("userId", "name email");

};


// crear

export const createLibroService = async (data) => {

    await Libro.create(data);

}


// delete

export const deleteLibroService = async (id) => {

    return await Libro.findByIdAndDelete(id);

}

// update

export const updateLibroService = async (id, data) => {

    return await Libro.findByIdAndUpdate(id, data, { new: true });

}

// replace

export const replaceLibroService = async (id, data) => {

    return await Libro.findByIdAndReplace(id, data, { new: true });

}