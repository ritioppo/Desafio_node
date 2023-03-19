const express = require("express");
//import express from 'express';
const router = express.Router();
//const router = require('express').Router()
const Produto = require("../models/Produto.js")
//import { Produto } from '../models/Produto.js'
const checkToken = require("./route_restaurante.js");


router.post('/',checkToken,async (req, res) => {
    
    const {nome, descricao, quantidade, preco, categoria} = req.body

    if(!nome) {
        res.status(422).json({error: 'o nome é obrigatório!'})
    }
    
    if(!descricao) {
        res.status(422).json({error: 'a descricao é obrigatório!'})
    }

    if(!quantidade) {
        res.status(422).json({error: 'a quantidade é obrigatório!'})
    }

    if(!preco) {
        res.status(422).json({error: 'o preco é obrigatório!'})
    }

    if(!categoria) {
        res.status(422).json({error: 'a categoria é obrigatória!'})
    }
    
    const produto = {
        nome, 
        descricao,
        quantidade,
        preco,
        categoria
    }

    
    try {
        
    await Produto.create(produto)

    res.status(201).json({message: 'Pessoa inserida no sistema com sucesso'})
    
    } catch (error) {
        res.status(500).json({error: error})
    }

})



router.get('/', async (req, res) => {
   
    try {
        const people = await Produto.find()
        res.status(200).json(people)
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.get('/:id', async (req, res) => {
    
    const id = req.params.id

    try {
        const produto = await Produto.findOne({_id: id})
        
        if(!produto) {
            res.status(422).json({message: 'o produto nao foi encotrado!'})
            return 
        }

        res.status(200).json(produto)
    } catch (error) {
        res.status(500).json({error: error})
    }

})
    

//upadte - autalizaçao de dados (PUT, PATCH)
router.patch('/:id',checkToken , async (req, res) => {
   
    const id = req.params.id
    
    const {nome, descricao, quantidade, preco, categoria} = req.body

    const produto = {
        nome,
        descricao,
        quantidade,
        preco,
        categoria,
    }
  
    try {

    
    const updateProduto = await Produto.updateOne({_id: id}, produto)
    
    if(updateProduto.matchedCount === 0) {

        res.status(422).json({message: 'o usario nao foi encotrado!'})
        return 
    }
    
    res.status(200).json(produto)
    

    }catch(error){

        res.status(500).json({error: error})
    
    }
}) 

//DELETE - deletar dados
router.delete('/:id',checkToken ,async (req, res) =>{

    const id = req.params.id

    const produto = await Produto.findOne({_id: id})
        
        if(!produto) {
            res.status(422).json({message: 'o usario nao foi encotrado!'})
            return 
        }

        try{
            await Produto.deleteOne({_id: id})

            res.status(200).json({message: 'Usário removido com sucesso!'})


        }catch(error){
            res.status(500).json({error: error})
        }


    })


module.exports = router;