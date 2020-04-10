const db = require('../controllers/dbController')
const mongoose = require('mongoose')
describe('DB', function() {

    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(function () {
                done();
            });
        });
    });

    it("should find user by id", async () => {
        
        let expectedResult = "AlTimofeevM"
        let result =  await db.findUserById("5e55785f222236202364b390");
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
        
        let expectedResult = "Найти все возможные события"
        let result =  await db.findQuestionById("5e557905222236202364b391")
        if(result.title!==expectedResult){
            throw new Error(`Expected ${expectedResult}, but got ${result}`)
        }
    })

    it("should find answer by id", async () => {
        
        let expectedResult = "5e557905222236202364b391"
        let result =  await db.findAnswerById("5e557b6d222236202364b392")
        if(result.question!==expectedResult){
            throw new Error(`Expected ${expectedResult}, but got ${result}`)
        }
    })


})
