import { deleteUserService, replaceUserService, updatePlanService } from "../services/usuario.services.js";


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

export const replaceUserController = async (req, res) => {
    const data = req.body;
    const { idUser } = req.params;
    const user = await replaceUserService(idUser, data);
    return res.status(200).json(user);
}

export const updatePlanController = async (req, res) => {

    const { plan } = req.body;
    const idUser = req.user.id;

    const user = await updatePlanService(idUser, plan);

    return res.status(200).json(user);

}