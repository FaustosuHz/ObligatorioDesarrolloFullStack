import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    completed: {
        type: Boolean,
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria",
        required: true
    }

});

libroSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

const Libro = mongoose.model("Libro", libroSchema);

export default Libro;