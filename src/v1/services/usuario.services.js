import User from "../models/usuario.model.js";


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

export const deleteUserService = async (id) => {

    return await User.findByIdAndDelete(id);

};

export const updateUserService = async (id, data) => {

    return await User.findByIdAndUpdate(id, data, { new: true });

};

export const replaceUserService = async (id, data) => {

    return await User.findByIdAndReplace(id, data, { new: true });

};

export const updatePlanService = async (id, plan) => {

    return await User.findByIdAndUpdate(
        id,
        { plan },
        { new: true }
    );

};