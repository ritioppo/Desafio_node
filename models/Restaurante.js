const mongoose = require("mongoose");
//import mongoose  from "mongoose";

const Restaurante = mongoose.model('Restaurante', {
    
    id: {type: Number },
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    categoria: { type: String, required: true },
    cidade: { type: String, required: true },
    endereco: { type: String, required: true },
    telefone: { type: String, required: true }
    
    
})

module.exports = Restaurante;
