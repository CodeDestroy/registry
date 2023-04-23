/* const { Prisma, PrismaClient } = require("@prisma/client"); */
const { response } = require("express");
const jwt = require('jsonwebtoken');
const ApiError = require("../exeptions/api-error");
const registrG35 = require('../models/registrG35(RC)')
const Token = require('../models/Token')
const userService = require('../service/user-service');
//const bodyParser = require('body-parser');
const City = require('../models/City')
const Course = require('../models/Course')
const PITRS = require('../models/PITRS')
const Polyclinic = require('../models/Polyclinic')
const { QueryTypes } = require('sequelize');
const sequelize = require('../sequelize')
const secret = process.env.SECRET_ACCESS



class DataController {

    async registrG35(req, res) {
        try {
            
            const rows = await sequelize.query(`
                SELECT r35.*, cit.city_name, cor.course_name, p.polyclinic_name, pitr.PITRS_name
                FROM registrg35s r35
                LEFT JOIN cities cit on cit.id = r35.cityId
                LEFT JOIN courses cor on cor.id = r35.courseId
                LEFT JOIN polyclinics p on p.id = r35.polyclinicId 
                LEFT JOIN pitrs pitr on pitr.id = r35.PITRId
                ORDER BY r35.id desc
                `, { type: QueryTypes.SELECT });
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }
    async cities(req, res) {
        try {
            
            const rows = await sequelize.query(`
                SELECT * 
                FROM cities
                `, { type: QueryTypes.SELECT });
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }

    async polyclinics(req, res) {
        try {
            
            const rows = await sequelize.query(`
                SELECT * 
                FROM polyclinics
                `, { type: QueryTypes.SELECT });
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }

    async courses(req, res) {
        try {
            
            const rows = await sequelize.query(`
                SELECT * 
                FROM courses
                `, { type: QueryTypes.SELECT });
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }

    async pitrs(req, res) {
        try {
            
            const rows = await sequelize.query(`
                SELECT * 
                FROM pitrs
                `, { type: QueryTypes.SELECT });
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }

    async getData(req, res) {
        try {
            //, , , , , , , , , , , , , , , , 
            const secondName = req.body.secondName
            const name = req.body.name
            const patronomic = req.body.patronomic
            const birthDate = req.body.birthDate
            const city = parseInt(req.body.city)
            const addressFact = req.body.addressFact
            const policlinica = parseInt(req.body.policlinica)
            const phone = req.body.phone
            const invalid = parseInt(req.body.invalid)
            const course = parseInt(req.body.course)
            const edss = req.body.edss
            const pitrs = parseInt(req.body.pitrs)
            const therapyPitrs = req.body.therapyPitrs
            const diagnozDate = req.body.diagnozDate
            const mrt = req.body.mrt
            const vipiski = req.body.vipiski
            const comments = req.body.comments
            const sql = `
            INSERT INTO registrg35s (firstName, secondName, patronomicName, birthDate, cityId, addressFact, polyclinicId, phone, invalid, courseId, 
                edss, PITRId, therapy, diagnozDate, mrt, vipiski, comments)
            VALUES ("${name}", "${secondName}", "${patronomic}", "${birthDate.substring(0, 10)}", ${city}, "${addressFact}", ${policlinica}, "${phone}", ${invalid}, ${course}, 
                ${edss}, ${pitrs}, "${therapyPitrs}", "${diagnozDate.substring(0, 10)}", "${mrt}", "${vipiski}", "${comments}")
            `
            res.send(sequelize.query(sql, {
                type: sequelize.QueryTypes.INSERT
            }))
        }
        catch (e) {
            console.log(e);
        }
    }

    


}
module.exports = new DataController();
