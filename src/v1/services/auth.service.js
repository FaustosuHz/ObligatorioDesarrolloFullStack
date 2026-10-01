import { constructorError } from "../../utils/contructor.error.js";
import { generarAccessTokenByUser } from "../../utils/token.util.js";
import { compararPassword, hashear } from "../../utils/validar-password.js";
import Usuario from "../models/usuario.model.js";
import { getUsuarioByEmail, getUsuarioByUsername } from "./usuario.service.js";


export const getUsuarioByEmailOrUsername = async (data) => {

    return await Usuario.findOne({
        $or: [
            { email: data },
            { username: data }
        ]
    }).select("+password");

}

export const generarTokenAuthService = (usuario) => {

    return generarAccessTokenByUser(usuario);

}

export const createUsuarioService = async (data) => {

    const email = data.email;
    const usuarioPorEmail = await getUsuarioByEmail(email);

    if (usuarioPorEmail) {
        const error = new Error("Error el usuario ya existe");
        error.status = 409;
        throw error;
    }

    const username = data.username;
    const usuarioPorUsername = await getUsuarioByUsername(username);

    if (usuarioPorUsername) {
        const error = new Error("Error el usuario ya existe");
        error.status = 409;
        throw error;
    }

    const password = data.password;
    const hashPassword = await hashear(password);
    data.password = hashPassword;

    const usuario = await Usuario.create(data);

    return usuario;
}

export const loginService = async (reqBody) => {

    const errorCredencialInvalida = constructorError("Credenciales invalidas", 401);

    if (!reqBody) {
        throw errorCredencialInvalida;
    }

    const emailOUsername = reqBody.identificador;

    const usuario = await getUsuarioByEmailOrUsername(emailOUsername);

    if (!usuario) {
        throw errorCredencialInvalida;
    }

    const passwordParam = reqBody.password;
    const passwordBase = usuario.password;

    const valid = await compararPassword(passwordParam, passwordBase);

    if (!valid) {
        throw errorCredencialInvalida;
    }

    return usuario;
}