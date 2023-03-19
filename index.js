const express = require ("express");
const mongoose = require ("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./src/swagger.json");


mongoose.set('strictQuery', true); 
const dotenv = require("dotenv");
//import dotenv from 'dotenv';
dotenv.config();


const app = express()
app.use(express.json())
// forma de ler JSON
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use(
    express.urlencoded({
        extended: true,
    }),
)



//rotas
const produtoRoutes = require("./src/produtoRoutes.js");
//import produtoRoutes from './src/produtoRoutes.js'
app.use('/person', produtoRoutes)

const restauranteRoutes = require("./src/route_restaurante.js");
//import  restauranteRoutes  from './src/route_restaurante.js';
app.use('/restaurantes', restauranteRoutes)

const pedidosRoutes = require("./src/pedidosRoutes.js");
//import pedidosRoutes from './src/pedidosRoutes.js';
app.use('/pedidos', pedidosRoutes)

// rota teste /endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!'})
})



const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD


mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.rd6eu6t.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectamos ao MongoDB!')
        app.listen(3000)
    }) 
    .catch((err) => console.log(err))






