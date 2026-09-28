import User from "../models/usuario.model.js";


//este metodo posiblente sea solo para un user admin, no para todos los usuarios

export const getAllUsersService = async () => {

    return await User.find();

};

export const getUserByIdService = async (id) => {

    return await User.findById(id).select("+password");

};

export const getUsuarioByEmail = async (email) => {

    return await User.findOne({ email });

};

export const getUsuarioByUsername = async (username) => {

    return await User.findOne({ username });

};

export const createUserService = async (data) => {

    return await User.create(data);

};

export const deleteUserService = async (id) => {

    return await User.findByIdAndDelete(id);

};

export const updateUserService = async (id, data) => {

    return await User.findByIdAndUpdate(id, data, { new: true });

};

export const replaceUserService = async (id, data) => {

    return await User.findByIdAndReplace(id, data, { new: true });

}