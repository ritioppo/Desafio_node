const mongoose = require("mongoose");
//import mongoose  from "mongoose";
//import { INTEGER } from "sequelize";

const Produto = mongoose.model('Produto', {
    
    id: {type: Number },
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    quantidade: { type: Number, required: true },
    preco: { type: Number, required: true },
    categoria: { type: String, required: true },
    id_restaurante: { type: Number}
    
})

module.exports = Produto;

