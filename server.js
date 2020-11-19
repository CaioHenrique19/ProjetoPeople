const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const porta = 3000
const got = require('got')
const { totalmem } = require('os')
const { query } = require('express')


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
async function getPerson(login){
    try {
        const response = await got(`http://localhost:3333/people`)
        return JSON.parse(response.body).filter((person) =>{
            return person.login.toUpperCase().includes(login.toUpperCase())
        })
    } catch (err) {
        console.log(err.response.body)
    }
}


//GET PERSON NAME
async function searchPeopleByName(name){
    try {
        const response = await got(`http://localhost:3333/people`)
        return JSON.parse(response.body).filter((person) =>{
            let includes = false
            const names = name.split(' ')
            names.forEach(queryName=> {
                if(person.name.toUpperCase().includes(queryName.toUpperCase())){
                    includes = true;
                }
            })
            return includes;
        })
    } catch (err) {
        console.log(err)
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

    let totalAwardPersonalizados = result[0].awardsCategories.filter((awardTeam) =>{
        return awardTeam.nameAwardsCategories === 'Personalizados'
    })
    
    let qtdAwardPersonalizados =  totalAwardPersonalizados.length


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
        teamEmployee: result[0].GU,
        baseEmployee: result[0].cityBase.nameCityBase,
        acronymCityBaseEmployee: result[0].cityBase.acronymCityBase,
        acronymCityBaseEmployee: result[0].cityBase.acronymCityBase,
        contract: result[0].project.nameProject,
        qtdAwardHighlight,
        qtdAwardAreaStar,
        qtdAwardYouRock,
        qtdAwardIndividualHighlight,
        qtdAwardPersonalizados,
        totalAwardHighlight,
        totalAwardAreaStar,
        totalAwardYouRock,
        totalAwardIndividualHighlight,
        totalAwardPersonalizados,
        optionBiograph: result[0].biographAvaliable,
        status: result[0].status
    })
})

server.get('/people/search', async (req, res) =>{
    const result = await searchPeopleByName(req.query.name)
    
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

    let totalAwardPersonalizados = result[0].awardsCategories.filter((awardTeam) =>{
        return awardTeam.nameAwardsCategories === 'Personalizados'
    })
    
    let qtdAwardPersonalizados =  totalAwardPersonalizados.length
 
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    let randomNumbers = [33, 50, 40, 30, 19, 14, 32, 54, 25, 36, 11, 13]

    for (let i = 1 ; i <= 12 ; i++){
        randomNumbers.push(getRandom(1,7));
    }

    console.log(randomNumbers.slice(16,23))

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
        teamEmployee: result[0].GU,
        baseEmployee: result[0].cityBase.nameCityBase,
        acronymCityBaseEmployee: result[0].cityBase.acronymCityBase,
        acronymCityBaseEmployee: result[0].cityBase.acronymCityBase,
        contract: result[0].project.nameProject,
        qtdAwardHighlight,
        qtdAwardAreaStar,
        qtdAwardYouRock,
        qtdAwardIndividualHighlight,
        qtdAwardPersonalizados,
        totalAwardHighlight,
        totalAwardAreaStar,
        totalAwardYouRock,
        totalAwardIndividualHighlight,
        totalAwardPersonalizados,
        optionBiograph: result[0].biographAvaliable,
        status: result[0].status,
        areaTimeLine: result[0].timeLine[0].areaTimeLine,
        beginMesTimeLine: result[0].timeLine[0].beginMesTimeLine,
        beginAnoTimeLine:result[0].timeLine[0].beginAnoTimeLine,
        areaTimeLine1: result[0].timeLine[1].areaTimeLine,
        beginMesTimeLine1: result[0].timeLine[1].beginMesTimeLine,
        beginAnoTimeLine1:result[0].timeLine[1].beginAnoTimeLine,
        areaTimeLine2: result[0].timeLine[2].areaTimeLine,
        beginMesTimeLine2: result[0].timeLine[2].beginMesTimeLine,
        beginAnoTimeLine2:result[0].timeLine[2].beginAnoTimeLine,
        chatPerson: result[0].chat,
        squad: result[0].team,
        randomNumbers: randomNumbers.slice(17,24),
    })
})

server.get('/people/:login', async(req, res) =>{
    
    const result = await getPerson(req.params.login)
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
