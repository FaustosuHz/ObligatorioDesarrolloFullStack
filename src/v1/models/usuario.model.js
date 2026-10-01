import mongoose from "mongoose";
import { Role, Roles } from "../../constants/role.constants.js";
import { Plan, Plans } from "../../constants/plan.constants.js";

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
    plan: {
        type: String,
        enum: Plans,
        default: Plan.plus
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

usuarioSchema.set('toJSON', {
    transform: (doc, ret) => {

        // renombrar _id → id
        ret.id = ret._id;

        //borramos el id de mongo
        delete ret._id;
        delete ret.password;

        delete ret.__v;

        return ret;
    }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;