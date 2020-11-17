const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const porta = 3000
const got = require('got')
const { totalmem } = require('os')


server.use(express.static("FRONTEND/public"))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))


nunjucks.configure('FRONTEND/src', {
    autoescape: true,
    express: server,
    watch: true,
})

server.set('view engine', '.html')

//GET PERSON
async function getPerson(name){
    try {
        const response = await got(`http://localhost:3333/people`)
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
        const response = await got('http://localhost:3333/people')  
        return JSON.parse(response.body)
    } catch (err) {
        console.log(err.response.body)
    }
}

//POST
async function insertPerson(person){
    try {
        const response = await got.post('http://localhost:3333/people', {
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
        const response = await got.delete(`http://localhost:3333/people/${id}`, {
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
        const response = await got.put(`http://localhost:3333/people/${id}`, {
            json: body,
            responseType: 'json'
        })
        return JSON.parse(response.data)
    } catch (err) {
        console.log(err.response)
    }
}

server.get('/', (req, res) =>{
    return res.render('../src/perfil.html')
   
})

server.get('/people', async(req, res) =>{

    const  result = await listPeople()

    let totalAwardHighlight = result[0].awardsCategories.filter((awardTeam) =>{
        return awardTeam.nameAwardsCategories === 'Team Highlight'
    })
    
    let qtdAwardHighlight = totalAwardHighlight.length

    let totalAwardAreaStar= result[0].awardsCategories.filter((awardTeam) =>{
        return awardTeam.nameAwardsCategories === 'Area Star'
    })

    let qtdAwardAreaStar =  totalAwardAreaStar.length

    let totalAwardYouRock = result[0].awardsCategories.filter((awardTeam) =>{
        return awardTeam.nameAwardsCategories === 'You Rock'
    })

    let qtdAwardYouRock=  totalAwardYouRock.length

    let totalAwardIndividualHighlight = result[0].awardsCategories.filter((awardTeam) =>{
        return awardTeam.nameAwardsCategories === 'Individual Highlight'
    })
    
    let qtdAwardIndividualHighlight =  totalAwardIndividualHighlight.length


    return res.render('../src/perfil.html',{
        nameEmployee: result[0].name,
        bp: result[0].bp,
        coach: result[0].coach,
        contact: result[0].contact,
        pdm: result[0].pdm,
        biograph: result[0].biograph,
        nickName: result[0].nickName,
        locateBuilding: result[0].cityBase.locationCityBase,
        emailEmployee: result[0].email,
        loginEmployee: result[0].login,
        companyEmployee: result[0].role.nameRole,
        teamEmployee: result[0].team[0].firstNameTeam,
        baseEmployee: result[0].cityBase.nameCityBase,
        acronymCityBaseEmployee: result[0].cityBase.acronymCityBase,
        acronymCityBaseEmployee: result[0].cityBase.acronymCityBase,
        qtdAwardHighlight,
        qtdAwardAreaStar,
        qtdAwardYouRock,
        qtdAwardIndividualHighlight,
        totalAwardHighlight,
        totalAwardAreaStar,
        totalAwardYouRock,
        totalAwardIndividualHighlight,





    })
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
