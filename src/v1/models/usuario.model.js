import mongoose from "mongoose";
import { Role, Roles } from "../../constants/role.constants.js";

const usuarioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: Roles,
        default: Role.user
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

usuarioSchema.set('toJSON', {
    //doc es el documento de mongoose y ret el elemento a devolver
    transform: (doc, ret) => {

        // renombrar _id → id
        ret.id = ret._id;

        //borramos el id de mongo
        delete ret._id;
        delete ret.password;

        // eliminar campos que no querés exponer
        delete ret.__v;
        // delete ret.createdAt;
        // delete ret.updatedAt;

        return ret;
    }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;