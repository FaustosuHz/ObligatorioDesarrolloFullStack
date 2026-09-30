import User from "../models/usuario.model.js";
import mongoose from "mongoose";

export const getAllUsersService = async () => {

    return await User.find();

};

export const getUserById = async (id) => {

    return await User.findById(id).select("+password");

};

export const getUsuarioByEmail = async (email) => {

    return await User.findOne({ email });

};

export const getUsuarioByUsername = async (username) => {

    return await User.findOne({ username });

};

export const deleteUserService = async (id) => {

    return await User.findByIdAndDelete(id);

};

export const updateUserService = async (id, data) => {

    if (!mongoose.isValidObjectId(id)) {
        const error = new Error("El ID del usuario no es válido");
        error.status = 400;
        throw error;
    }

    const usuario = await User.findById(id);

    if (!usuario) {
        const error = new Error("El usuario no existe");
        error.status = 404;
        throw error;
    }

    return await User.findByIdAndUpdate(id, data, { new: true });

};

export const updatePlanService = async (id, plan) => {

    return await User.findByIdAndUpdate(
        id,
        { plan },
        { new: true }
    );

};