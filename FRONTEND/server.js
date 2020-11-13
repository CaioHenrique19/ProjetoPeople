const express = require('express')
const server = express()
const bodyParser = require('body-parser')


const porta = 3001

server.use(bodyParser.json())
server.use(express.urlencoded({extended: true}))
server.use(express.static("public"))




server.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/timelineModern.html")
})

server.listen(porta, ()=>{
    console.log("iniciado na porta 3001")
})