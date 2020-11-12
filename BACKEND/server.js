const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const porta = 3000
const got = require('got')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))


async function getPerson(id){
    try {
        const response = await got('http://localhost:3333/searchResults')  
        return JSON.parse(response.body)[id]
    } catch (err) {
        console.log(err.response.body)
    }
}


async function insertPerson(person){
    try {
        const response = await got.post('http://localhost:3333/searchResults', {
            json: person,
            responseType: 'json'
        })
        return JSON.parse(response.data)
    } catch (err) {
        console.log(err.response)
    }
}


async function listPeople(){
    try {
        const response = await got('http://localhost:3333/searchResults')  
        return JSON.parse(response.body)
    } catch (err) {
        console.log(err.response.body)
    }
}


server.get('/people', async(req, res) =>{

    const result = await listPeople()
    res.send(result)
})

server.get('/people/:id', async(req, res) =>{

    const result = await getPerson(req.params.id)
    res.send(result)
})

server.post('/people', async (req, res) =>{
    const result = await insertPerson(req.body)
    res.send(result)
})


server.listen(porta, ()=>{
    console.log(`iniciado ${porta}`)
})