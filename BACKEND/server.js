const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const porta = 3000

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))



server.get('/', (req, res) =>{
    res.send("Olá")
})



server.listen(porta, ()=>{
    console.log("iniciado na porta 3000")
})
