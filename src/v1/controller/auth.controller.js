import { generateAccessToken } from "../../utils/token.util.js";
import { compararPassword } from "../../utils/validar-password.js";
import { getUserByEmailOrUsername } from "../services/auth.service.js";



export const loginController = async (req, res) => {

    //meter un middleware que valide el body y convierta en un user

    //valida que el body sea un password y un username o email
    //crea un objeto que se asigna al req.body.identificador el username o email 
    //req.body.password el password que venia
    const userLogin = req.body

    if (!userLogin) {
        //TODO revisar codigo de error
        return res.status(401).json({ message: "Usuario incorrecto" });
    }
    const emailOUsername = userLogin.identificador;

    //valida que exita usuario en la base, obtener el usuario por el email
    const user = await getUserByEmailOrUsername(emailOUsername);

    //si no existe error
    if (!user) {
        //TODO revisar codigo de error
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    //si existe
    const passwordParam = userLogin.password;
    const passwordBase = user.password;

    //validar password pasado por data con el password del usuario recuperado
    const valid = compararPassword(passwordParam, passwordBase);

    //si no valida error
    if (!valid) {
        //TODO revisar codigo de error
        return res.status(401).json({ message: "Usuario no autorizar" });
    }

    //si valida generamos el JWT

    const data = {
        id: user._id,
        username: user.username,
        name: user.name
    }
    const token = generateAccessToken(data);
    //devolvemos user y token
    return res.status(200).json({
        user,
        token
    });
}





