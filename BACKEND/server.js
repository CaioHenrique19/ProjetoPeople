const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const porta = 3000
const got = require('got')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))


//GET PERSON
async function getPerson(name){
    try {
        const response = await got(`http://localhost:3333/searchResults`)
        return JSON.parse(response.body).filter((person) =>{
            return person.name === name
        })
    } catch (err) {
        console.log(err.response.body)
    }
}


//GET PEOPLE
async function listPeople(){
    try {
        const response = await got('http://localhost:3333/searchResults')  
        return JSON.parse(response.body)
    } catch (err) {
        console.log(err.response.body)
    }
}

//POST
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

//DELETE
async function deletePerson(id){
    try {
        const response = await got.delete(`http://localhost:3333/searchResults/${id}`, {
            responseType: 'json'
        })
        return JSON.parse(response.data)
    } catch (err) {
        console.log(err.response)
    }
}

//PUT
async function changePerson(id,body){
    try {
        const response = await got.put(`http://localhost:3333/searchResults/${id}`, {
            json: body,
            responseType: 'json'
        })
        return JSON.parse(response.data)
    } catch (err) {
        console.log(err.response)
    }
}


server.get('/people', async(req, res) =>{

    const result = await listPeople()
    res.send(result)
})

server.get('/people/:name', async(req, res) =>{
    
    const result = await getPerson(req.params.name)
    res.send(result)
})

server.post('/people', async (req, res) =>{
    const result = await insertPerson(req.body)
    res.send(result)
})

server.delete('/people/:id', async (req, res) =>{
    const result = await deletePerson(req.params.id)
    res.send(result)
    
})

server.put('/people/:id', async (req, res) =>{
    const result = await changePerson(req.params.id, req.body)
    res.send(result)
    
})

server.listen(porta, ()=>{
    console.log(`iniciado ${porta}`)
})
