import { createUsuarioService, generarTokenAuthService, loginService } from "../services/auth.service.js";

export const loginController = async (req, res) => {
    const reqBody = req.body
    const user = await loginService(reqBody);
    const token = generarTokenAuthService(user);

    return res.status(200).json({
        user,
        token
    });
}

export const registerController = async (req, res) => {
    const data = req.body;
    const user = await createUsuarioService(data);
    const token = generarTokenAuthService(user);

    return res.status(201).json({
        user,
        token
    });
}