import { deleteUserService, getUserById, updateUserService, updatePlanService, getAllUsersService } from "../services/usuario.service.js";


export const getUserByIdController = async (req, res) => {
    const { idUser } = req.params;
    const user = await getUserById(idUser);
    return res.status(200).json(user);
}

export const deleteUserController = async (req, res) => {
    const { idUser } = req.params;
    await deleteUserService(idUser);
    return res.status(204).send();
}

export const updateUserController = async (req, res) => {
    const data = req.body;
    const { idUser } = req.params;
    const user = await updateUserService(idUser, data);
    return res.status(200).json(user);
}

export const getUsersController = async (req, res) => {
    const users = await getAllUsersService();
    return res.status(200).json(users);
}

export const updatePlanController = async (req, res) => {

    const { plan } = req.body;
    const idUser = req.user.id;

    const user = await updatePlanService(idUser, plan);

    return res.status(200).json(user);
}