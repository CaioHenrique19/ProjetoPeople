const faker = require('faker')



function generalPeople(){
   return {
        "loginCoach": faker.internet.userName(),
        "firstNameCoach": faker.name.firstName(),
        "nickNameCoach": faker.name.suffix() 
    }
}

function generatePeople(){
    const searchResults = []


    for(let id = 0; id < 10; id++){

        
        searchResults.push({
            "id":id,
            "login": faker.name.prefix(),
            "nickName": faker.name.suffix(),
            "email": faker.internet.email(),
            "admission": faker.random.number(),
            "admissionReal": faker.random.number() ,
            "role":{
                "codeRole": faker.random.number() ,
                "nameRole": faker.name.jobTitle() ,
                },
            "area":{
                "codeArea": faker.random.number() ,
                "nameArea": faker.name.jobArea() ,
                "beginArea": null
            },
            "project": {
                "codeProject": faker.random.number() ,
                "nameProject": faker.lorem.word() 
            },
            "cityBase":{
                "codeCityBase": faker.random.number() ,
                "nameCityBase": faker.address.state() ,
                "acronymCityBase": faker.address.state() ,
                "locationCityBase": `${id}º Andar proximo a entrada`    
            },
            "company":{
                "codeCompany": faker.random.number() ,
                "nameCompany": "CIT Software S.A."
            },
            "timeLine":[
                {
                    "areaTimeLine": faker.name.jobArea(),
                    "projectTimeLinet": faker.random.word(),
                    "teamTimeLine": faker.random.word(),
                    "beginDateTimeLine": faker.date.past()
                }
            ],
            "team":[
                {
                    "loginTeam": faker.internet.userName(),
                    "firstNameTeam": faker.name.prefix(),
                    "nickNameTeam": faker.name.suffix(),
                    "pictureTeam": faker.image.people()
                }
            ],
            "coach":generalPeople(),
            "pdm":generalPeople(),
            "bp":generalPeople(),
            
            "biograph": faker.lorem.paragraph() ,
            "avaliable": faker.random.boolean() ,
            "clientName": faker.company.companyName(),
            "picture": faker.image.people()  ,
            "awardsCategories":[
                {
                    "nameAwardsCategories": "Team Highlight",
                    "iconAwardsCategories": faker.image.abstract(),
                    "awards": [
                        {
                            "dateAwardsCategories": faker.date.past() ,
                            "loginDelivAwardsCategories": faker.name.prefix(),
                            "commentAwardsCategories": faker.lorem.paragraph() 
                        }
                    ]
                }
            ]
        })
    }
    return {"searchResults": searchResults}
}

module.exports = generatePeople