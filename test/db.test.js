const db = require('../controllers/dbController')
const mongoose = require('mongoose')
describe('DB', function() {

    after(function (done) {
            mongoose.connection.close(function () {
                done();
            });
    });

    it("should find user by id", async () => {
        
        let expectedResult = "AlTimofeevM"
        let result =  await db.findUserById("5e90bf269430660017de751c");
        if(result.token!==expectedResult){
            throw new Error(`Expected ${expectedResult}, but got ${result}`)
        }
    })

    it("should find user by token", async () => {
        
        let expectedResult = "AlTimofeevM"
        let result =  await db.findUserByToken("AlTimofeevM");
        if(result.token!==expectedResult){
            throw new Error(`Expected ${expectedResult}, but got ${result}`)
        }
    })

    it("should find user by email", async () => {
        
        let expectedResult = "AlTimofeevM"
        let result =  await db.findUserByEmail("al.timofeev.m@yandex.ru")
        if(result.token!==expectedResult){
            throw new Error(`Expected ${expectedResult}, but got ${result}`)
        }
    })

    it("should find question by id", async () => {
        
        let expectedResult = "Какая сумма?"
        let result =  await db.findQuestionById("5e90c02be56f6f00170f976a")
        if(result.title!==expectedResult){
            throw new Error(`Expected ${expectedResult}, but got ${result}`)
        }
    })

    it("should find answer by id", async () => {
        
        let expectedResult = "5e90c02be56f6f00170f976a"
        let result =  await db.findAnswerById("5e90c03ce56f6f00170f976b")
        if(result.question!==expectedResult){
            throw new Error(`Expected ${expectedResult}, but got ${result}`)
        }
    })


})
