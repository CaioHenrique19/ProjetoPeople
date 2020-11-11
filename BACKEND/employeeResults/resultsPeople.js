const faker = require('faker')

function generatePeople(){
    const searchResults = []

    for(let id = 0; id < 10; id++){
        let login = faker.name.prefix()
        let nickName = faker.name.suffix() 
        let email = faker.internet.email()
        let admission = faker.random.number()
        let admissionReal = faker.random.number() 
        let codeRole = faker.random.number() 
        let nameRole = faker.name.jobTitle() 
        let codeArea = faker.random.number() 
        let nameArea = faker.name.jobArea() 
        let beginArea = faker.random.boolean()
        let codeProject = faker.random.number() 
        let nameProject = faker.lorem.word() 
        let codeCityBase = faker.random.number() 
        let nameCityBase  = faker.address.state() 
        let acronymCityBase  = faker.address.state() 
        let codeCompany  = faker.random.number() 
        let areaTimeLine = faker.name.jobArea()
        let projectTimeLine = faker.random.word()
        let teamTimeLine = faker.random.word()
        let beginDateTimeLine = faker.date.past()
        let loginTeam = faker.internet.userName()
        let firstNameTeam = faker.name.prefix()
        let nickNameTeam = faker.name.suffix()
        let pictureTeam = faker.image.people()
        let loginCoach = faker.internet.userName()
        let firstNameCoach = faker.name.firstName()
        let nickNameCoach = faker.name.firstName()
        let loginPDM = faker.name.prefix() 
        let firstNamePDM = faker.name.firstName()
        let nickNamePDM = faker.name.suffix()
        let loginBP = faker.internet.userName()
        let firstNameBP = faker.name.firstName()
        let nickNameBP = faker.name.suffix()
        let biograph = faker.lorem.paragraph() 
        let avaliable = faker.random.boolean() 
        let clientName = faker.company.companyName()
        let picture = faker.image.people()  
        let iconAwardsCategories = faker.image.abstract()
        let dateAwardsCategories = faker.date.past() 
        let loginDelivAwardsCategories = faker.name.prefix()
        let commentAwardsCategories = faker.lorem.paragraph() 

        searchResults.push({
            "id":id,
            "login": login,
            "nickName": nickName,
            "email": email,
            "admission": admission,
            "admissionReal": admissionReal,
            "role":{
                "codeRole": codeRole,
                "nameRole": nameRole,
                },
            "area":{
                "codeArea": codeArea,
                "nameArea": nameArea,
                "beginArea": null
            },
            "project": {
                "codeProject": codeProject,
                "nameProject": nameProject
            },
            "cityBase":{
                "codeCityBase": codeCityBase,
                "nameCityBase": nameCityBase,
                "acronymCityBase": acronymCityBase,
                "locationCityBase": `${id}º Andar proximo a entrada`    
            },
            "company":{
                "codeCompany": codeCompany,
                "nameCompany": "CIT Software S.A."
            },
            "timeLine":[
                {
                    "areaTimeLine": areaTimeLine,
                    "projectTimeLinet": projectTimeLine,
                    "teamTimeLine": teamTimeLine,
                    "beginDateTimeLine": beginDateTimeLine
                }
            ],
            "team":[
                {
                    "loginTeam": loginTeam,
                    "firstNameTeam": firstNameTeam,
                    "nickNameTeam": nickNameTeam,
                    "pictureTeam": pictureTeam
                }
            ],
            "coach": {
                "loginCoach": loginCoach,
                "firstNameCoach": firstNameCoach,
                "nickNameCoach": nickNameCoach
            },
            "pdm":{
                "loginPDM": loginPDM,
                "firstNamePDM": firstNamePDM,
                "nickNamePDM": nickNamePDM
            },
            "bp":{
                "loginBP": loginBP,
                "firstNameBP": firstNameBP,
                "nickNameBP": nickNameBP
            },
            "biograph": biograph,
            "avaliable": avaliable,
            "clientName": clientName,
            "picture": picture,
            "awardsCategories":[
                {
                    "nameAwardsCategories": "Team Highlight",
                    "iconAwardsCategories": iconAwardsCategories,
                    "awards": [
                        {
                            "dateAwardsCategories": dateAwardsCategories,
                            "loginDelivAwardsCategories": loginDelivAwardsCategories,
                            "commentAwardsCategories": commentAwardsCategories
                        }
                    ]
                }
            ]
        })
    }
    return {"searchResults": searchResults}
}

module.exports = generatePeople