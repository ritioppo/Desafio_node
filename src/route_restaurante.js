const express = require("express");
//import express from 'express';
const router = express.Router();
const Restaurante = require("../models/Restaurante.js")
//import Restaurante from '../models/Restaurante.js';
const bcrypt = require("bcrypt");
//import bcrypt from 'bcrypt';
const jwt = require("jsonwebtoken");
//import jwt from 'jsonwebtoken';

router.use(express.json())


//private route


function checkToken(req, res, next) {
    console.log("chegou!")
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({msg: 'Acesso negado!'})
    }

    try {
        
    const secret = process.env.SECRET
    
    jwt.verify(token, secret)
    
    next()
    }catch(error) {
        res.status(400).json({msg: 'Token invalido!'})
    }
}


//register user


    //login user

    router.post("/auth/login",  async (req, res) => {
    
    
    const {email, senha} = req.body

    // validations
    if(!email){
        return res.status(422).json({msg: "email obrigatorio"})
        
    }
    if(!senha){
        return res.status(422).json({msg: "senha obrigatorio"})
        
    }

    // check if user exists
    const restaurante = await Restaurante.findOne({email: email})

    if(!restaurante) {
        return res.status(404).json({msg: 'Usuario nao encontrado'})
    }
    
    // check if passowrd check
    const checkPassowrd = await bcrypt.compare(senha, restaurante.senha)

    if(!checkPassowrd) {
        return res.status(422).json({msg: 'Senha invalida'})
    }
    
    try {
    
    const secret = process.env.SECRET

    const token = jwt.sign(
        {
        
            id: restaurante._id
        }, 
        secret,
        {
            expiresIn: "30d"
        } 
    )
    
    res.status(200).json({msg: "Autenticacao realizada com sucesso", token})

    }   catch(err) {
        res.status(400).json({message: "nao autenticado!"})

        res.status(500).json({
            msg: 'Acontenceu algum erro no servidor',
        })
        
    
    }
    

    })
    
    
    
    
    
    router.post('/',checkToken, async (req, res) => {
       
        console.log("chegou!")
        const {nome, email, senha, categoria, cidade, endereco, telefone} = req.body
    
        if(!nome) {
            res.status(422).json({error: 'o nome é obrigatório!'})
        }
        
        if(!email) {
            res.status(422).json({error: 'o email é obrigatório!'})
        }
    
        if(!senha) {
            res.status(422).json({error: 'a senha é obrigatório!'})
        }
    
        if(!categoria) {
            res.status(422).json({error: 'a categoria é obrigatório!'})
        }
    
        if(!cidade) {
            res.status(422).json({error: 'a cidade é obrigatória!'})
        }
        
        if(!endereco) {
            res.status(422).json({error: 'o endereço é obrigatória!'})
        }

        if(!telefone) {
            res.status(422).json({error: 'o telefone é obrigatória!'})
        }
        
        
        
        const restaurante = {
            nome, 
            email,
            senha,
            categoria,
            cidade,
            endereco,
            telefone
        }
    
        
        try {
            
        await Restaurante.create(restaurante)
    
        res.status(201).json({message: 'Restaurante inserido no sistema com sucesso'})
        
        } catch (error) {
            res.status(500).json({error: error})
        }
    
    })
    
    
    
    router.get('/', async (req, res) => {
       
        try {
            const restaurante = await Restaurante.find()
            res.status(200).json(restaurante)
            
        } catch (error) {
            res.status(500).json({error: error})
        }
    
    })
    
    
    router.get("/:id", async(req, res) =>{

   
        const id = req.params.id
    
        //check if user exists
        const restaurante = await Restaurante.findOne({_id: id})
    
        if(!restaurante) {
            return res.status(404).json({msg: 'usuario nao encontrado!'})
        }
    
        res.status(200).json({restaurante})
    
    
    })    
    

    //upadte - autalizaçao de dados (PUT, PATCH)
    router.patch('/:id', checkToken,async (req, res) => {
       
        const id = req.params.id
        
        const {nome, email, categoria, senha, cidade, endereco, telefone} = req.body
    
        const restaurante = {
            nome, 
            email,
            senha,
            categoria,
            cidade,
            endereco,
            telefone
        }
      
        try {
    
        
        const updateRestaurante = await Restaurante.updateOne({_id: id}, restaurante)
        
        if(updateRestaurante.matchedCount === 0) {
    
            res.status(422).json({message: 'o restaurante nao foi encotrado!'})
            return 
        }
        
        res.status(200).json(restaurante)
        
    
        }catch(error){
    
            res.status(500).json({error: error})
        
        }
    }) 
    
    //DELETE - deletar dados
    router.delete('/:id', checkToken, async (req, res) =>{
    
        const id = req.params.id
    
        const restaurante = await Restaurante.findOne({_id: id})
            
            if(!restaurante) {
                res.status(422).json({message: 'o restaurante nao foi encotrado!'})
                return 
            }
    
            try{
                await Restaurante.deleteOne({_id: id})
    
                res.status(200).json({message: 'Restaurante removido com sucesso!'})
    
    
            }catch(error){
                res.status(500).json({error: error})
            }
    
    
        })
    
    
    module.exports = router;



module.exports = router;