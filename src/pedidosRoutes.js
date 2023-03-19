const express = require("express");
//import express from 'express';
const router = express.Router();
//const router = require('express').Router()
const Pedidos = require("../models/Pedidos.js");
//import { Pedidos } from '../models/Pedidos.js'
const checkToken = require("./route_restaurante.js");

   



router.post('/',checkToken ,async (req, res) => {
    
    const {produtos, valor_total, nome_cliente, cidade_cliente, endereco_cliente, telefone_cliente, restaurante_id} = req.body

    if(!nome_cliente) {
        res.status(422).json({error: 'o nome é obrigatório!'})
    }
    
    if(!produtos) {
        res.status(422).json({error: 'o produto é obrigatório!'})
    }
   
    if(!valor_total) {
        res.status(422).json({error: 'o valor total é obrigatório!'})
    }
   
    if(!cidade_cliente) {
        res.status(422).json({error: 'a cidade cleiente é obrigatório!'})
    }
   
    if(!endereco_cliente) {
        res.status(422).json({error: 'o endereco cliente é obrigatório!'})
    }
   
    if(!telefone_cliente) {
        res.status(422).json({error: 'o telefone cliente é obrigatório!'})
    }

    if(!restaurante_id) {
        res.status(422).json({error: 'o restauante id é obrigatório!'})
    }

    const pedidos = {
        produtos,
        valor_total,
        nome_cliente,
        cidade_cliente,
        endereco_cliente,
        telefone_cliente,
        restaurante_id
        
    }

    
    try {
        
    await Pedidos.create(pedidos)

    res.status(201).json({message: 'Pedido inserido com sucesso'})
    
    } catch (error) {
        res.status(500).json({error: error})
    }


})



router.get('/', async (req, res) => {
    console.log("chegou!")
    try {
        const pedido = await Pedidos.find()
        res.status(200).json(pedido)
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.get('/:id', async (req, res) => {
    
    const id = req.params.id
    
    try {
        const pedidos = await Pedidos.findOne({_id: id})
        
        if(!pedidos) {
            res.status(422).json({message: 'o usario nao foi encotrado!'})
            return 
        }

        res.status(200).json(pedidos)
    } catch (error) {
        res.status(500).json({error: error})
    }

})
    
//upadte - autalizaçao de dados (PUT, PATCH)
router.patch('/:id',checkToken ,async (req, res) => {
    const id = req.params.id
    const {name, salary, approved} = req.body

    const pedidos = {
        name, 
        salary,
        approved,
    }

    try {

    
    const updatePedidos = await Pedidos.updateOne({_id: id}, pedidos)
    
    if(updatePedidos.matchedCount === 0) {

        res.status(422).json({message: 'o usario nao foi encotrado!'})
        return 
    }
    
    res.status(200).json(pedidos)
    

    }catch(error){

        res.status(500).json({error: error})
    
    }
}) 

//DELETE - deletar dados
router.delete('/:id', checkToken,async (req, res) =>{

    const id = req.params.id

    const pedido = await Pedidos.findOne({_id: id})
        
        if(!pedido) {
            res.status(422).json({message: 'o pedido nao foi encotrado!'})
            return 
        }

        try{
            await Pedidos.deleteOne({_id: id})

            res.status(200).json({message: 'Usário removido com sucesso!'})


        }catch(error){
            res.status(500).json({error: error})
        }


    })


module.exports = router;