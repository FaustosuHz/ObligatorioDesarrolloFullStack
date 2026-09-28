import { constructorError } from "../../utils/contructor.error.js";
import { generarAccessTokenByUser } from "../../utils/token.util.js";
import { compararPassword, hashear } from "../../utils/validar-password.js";
import Usuario from "../models/usuario.model.js";
import { getUsuarioByEmail, getUsuarioByUsername } from "./usuario.services.js";


export const getUsuarioByEmailOrUsername = async (data) => {

    return await Usuario.findOne({
        $or: [
            { email: data },
            { username: data }
        ]
    }).select("+password");

}


// data es un usuario completo
export const createUsuarioService = async (data) => {

    // hay que validar que no existe un usuario con email ni username

    const email = data.email;
    const usuarioPorEmail = await getUsuarioByEmail(email);

    if (usuarioPorEmail) {
        throw new Error("Error el usuario ya existe");
    }

    const username = data.username;
    const usuarioPorUsername = await getUsuarioByUsername(username);

    if (usuarioPorUsername) {
        throw new Error("Error el usuario ya existe");
    }

    // generar password encriptado
    const password = data.password;
    const hashPassword = await hashear(password);
    data.password = hashPassword;

    // guardamos y retornamos el usuario
    const usuario = await Usuario.create(data);

    return usuario;
}


export const generarTokenAuthService = (usuario) => {

    return generarAccessTokenByUser(usuario);

}


export const loginService = async (reqBody) => {

    const errorCredencialInvalida = constructorError("Credenciales invalidas", 401);

    if (!reqBody) {
        throw errorCredencialInvalida;
    }

    const emailOUsername = reqBody.identificador;

    // valida que exista usuario en la base
    const usuario = await getUsuarioByEmailOrUsername(emailOUsername);

    // si no existe error
    if (!usuario) {
        throw errorCredencialInvalida;
    }

    // si existe
    const passwordParam = reqBody.password;
    const passwordBase = usuario.password;

    // validar password
    const valid = await compararPassword(passwordParam, passwordBase);

    // si no valida error
    if (!valid) {
        throw errorCredencialInvalida;
    }

    return usuario;
}