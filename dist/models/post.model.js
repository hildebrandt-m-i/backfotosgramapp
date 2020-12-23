"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose"); // Importo paquetes para crear el modelo
// Armado de esquema
const postSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    imgs: [{
            type: String
        }],
    coords: {
        type: String
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una referencia a un usuario']
    }
});
postSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
// Exporto el modelo
exports.Post = mongoose_1.model('Post', postSchema);
