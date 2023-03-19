const mongoose = require("mongoose");
//import mongoose  from "mongoose";

const Pedidos = mongoose.model('Pedidos', {
    
    id: {type: Number },
    produtos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'produtos', required: true }],
    valor_total: { type: Number, required: true },
    nome_cliente: { type: String, required: true },
    cidade_cliente: { type: String, required: true },
    endereco_cliente: { type: String, required: true },
    telefone_cliente: { type: String, required: true },
    restaurante_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'restaurantes', required: true}]

   
    
})

module.exports = Pedidos;
