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
    //registr G35
    async registrG35(req, res) {
        try {
            
            const rows = await prisma.$queryRaw`
                SELECT r35.*, cit.city_name, cor.course_name, p.polyclinic_name, pitr.PITRS_name
                FROM registrG35s r35
                LEFT JOIN cities cit on cit.id = r35.cityId
                LEFT JOIN coursesG35 cor on cor.id = r35.courseId
                LEFT JOIN polyclinics p on p.id = r35.polyclinicId 
                LEFT JOIN PITRs pitr on pitr.id = r35.PITRId
                ORDER BY r35.id desc
                `
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }
    //components registr G35
    async cities(req, res) {
        try {
            
            const rows = await prisma.$queryRaw`
                SELECT * 
                FROM cities
                `
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }

    async polyclinics(req, res) {
        try {
            
            const rows = await prisma.$queryRaw`
                SELECT * 
                FROM polyclinics
                `
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }

    async courses(req, res) {
        try {
            
            const rows = await prisma.$queryRaw`
                SELECT * 
                FROM coursesG35
                `
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }

    async pitrs(req, res) {
        try {
            
            const rows = await prisma.$queryRaw`
                SELECT * 
                FROM PITRs
                `
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }

    //data registr G35
    async getData(req, res) {
        try {            
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
            const response = await prisma.$queryRaw`
                    INSERT INTO registrG35s (firstName, secondName, patronomicName, birthDate, cityId, addressFact, polyclinicId, phone, invalid, courseId, 
                        edss, PITRId, therapy, diagnozDate, mrt, vipiski, comments)
                    VALUES ("${name}", "${secondName}", "${patronomic}", "${birthDate.substring(0, 10)}", ${city}, "${addressFact}", ${policlinica}, "${phone}", ${invalid}, ${course}, 
                        ${edss}, ${pitrs}, "${therapyPitrs}", "${diagnozDate.substring(0, 10)}", "${mrt}", "${vipiski}", "${comments}")
                    `
            res.send(response)
        }
        catch (e) {
            console.log(e);
        }
    }

    //registr InterPnevm
    async registrInterPnevm (req, res) {
        try {
            const rows = await prisma.$queryRaw`
                SELECT r35.*, cor.course_name
                FROM registrPulm r35
                LEFT JOIN coursePulm cor on cor.id = r35.course_id
                ORDER BY r35.id desc
                `
            return res.send(rows)
        }
        catch (e) {
            console.log(e)
        }
    }

    // components registr InterPnevm
    async coursePulm (req, res) {
        try {
            const response = await prisma.coursePulm.findMany({})
            res.send(response)
        }
        catch (e) {
            console.log(e)
        }
    }

    //data registr InterPnevm
    async sendDataRegInterPnevm (req, res) {
        const secondName = req.body.secondName
        const name = req.body.name
        const patronomic = req.body.patronomic
        const birthDate = req.body.birthDate
        const addressFact = req.body.addressFact
        const phone = req.body.phone
        const lastHospitalizationDate = req.body.lastHospitalizationDate
        const height = parseInt(req.body.height)
        const weight = parseInt(req.body.weight)
        const pneumoniaType = req.body.pneumoniaType
        const mMRS = req.body.mMRS
        const FJELoriginal = req.body.FJELoriginal
        const DLCOoriginal = req.body.DLCOoriginal
        const flowType = req.body.flowType
        const courseId = parseInt(req.body.courseId)
        const initTherapyDate = req.body.initTherapyDate
        const controlVisitNumber = req.body.controlVisitNumber
        const controlVisitDate = req.body.controlVisitDate
        const mMRScontrol = req.body.mMRScontrol
        const FJELcontrol = req.body.FJELcontrol
        const DLCOcontrol = req.body.DLCOcontrol
        const comments = req.body.comments

        const response = await prisma.registrPulm.create({
            data: {
                secondName: secondName,
                firstName: name,
                patronomicName: patronomic,
                birthDate: birthDate,
                address: addressFact,
                phone: phone,
                lastHospitalizationDate: lastHospitalizationDate,
                height: height,
                weight: weight,
                pneumoniaType: pneumoniaType,
                mMRS: mMRS,
                FJELoriginal: FJELoriginal,
                DLCOoriginal: DLCOoriginal,
                flowType: flowType,
                course_id: courseId,
                initTherapyDate: initTherapyDate,
                controlVisitNumber: controlVisitNumber,
                controlVisitDate: controlVisitDate,
                mMRScontrol: mMRScontrol,
                FJELcontrol: FJELcontrol,
                DLCOcontrol: DLCOcontrol,
                comments: comments

            }
        })

        /* const response = await prisma.$queryRaw`
                    INSERT INTO registrPulm (firstName, secondName, patronomicName, birthDate, address, phone, lastHospitalizationDate, height, weight, 
                        pneumoniaType, mMRS, FJELoriginal, DLCOoriginal, flowType, course_id, initTherapyDate, 
                        controlVisitNumber, controlVisitDate, mMRScontrol, FJELcontrol, DLCOcontrol, comments)
                    VALUES ("${name}", "${secondName}", "${patronomic}", "${birthDate}",  "${addressFact}", "${phone}", ${lastHospitalizationDate}, ${height}, ${weight}, 
                        ${pneumoniaType}, "${mMRS}", "${FJELoriginal}", "${DLCOoriginal}", "${flowType}", "${courseId}", "${initTherapyDate}", 
                        "${controlVisitNumber}", "${controlVisitDate}", "${mMRScontrol}", ${FJELcontrol}, "${DLCOcontrol}", "${comments}")
                    ` */
            res.send(response)
    }


    //registr BrochPulm
    async registrBronchPulm (req, res) {
        try {
            const rows = await prisma.$queryRaw`
                SELECT rbp.*, ai.name, cpob.name, bt.name, bci.name, cp.name  
                FROM registrBronchPulm rbp 
                LEFT JOIN allerg_illness ai on ai.id = rbp.allerg_illness_id 
                LEFT JOIN choice_preparat_on_bit cpob on cpob.id  = rbp.choice_preparat_on_bit_id 
                LEFT JOIN bazis_therapy bt on bt.id = rbp.bazis_therapy_id 
                LEFT JOIN ba_course_illness bci on bci.id = rbp.ba_course_illness_id 
                LEFT JOIN cardio_patolog cp on cp.id = rbp.cardio_patolog_id 
                ORDER BY rbp.id desc
                `
            return res.send(rows)
        }
        catch (e) {
            console.log(e)
        }
    }

    //components registr BrochPulm
    async allergIllness(req, res) {
        try {
            
            const rows = await prisma.$queryRaw`
                SELECT * 
                FROM allerg_illness
                `
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }

    async choicePreparatOnBit(req, res) {
        try {
            
            const rows = await prisma.$queryRaw`
                SELECT * 
                FROM choice_preparat_on_bit
                `
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }

    async bazisTherapy(req, res) {
        try {
            
            const rows = await prisma.$queryRaw`
                SELECT * 
                FROM bazis_therapy
                `
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }

    async baCourseIllness(req, res) {
        try {
            
            const rows = await prisma.$queryRaw`
                SELECT * 
                FROM ba_course_illness
                `
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }

    async cardioPatolog(req, res) {
        try {
            
            const rows = await prisma.$queryRaw`
                SELECT * 
                FROM cardio_patolog
                `
            return res.send(rows)
        }
        catch (e) {
            console.log(e);
        }
    }

    //data registr BrochPulm
    async sendDataRegBronchPulm(req, res) {
        try {            
            const secondName = req.body.secondName
            const name = req.body.name
            const patronomic = req.body.patronomic
            const birthDate = req.body.birthDate            
            const addressFact = req.body.addressFact            
            const phone = req.body.phone
            const lastHospitalizationDate = req.body.lastHospitalizationDate
            const height = parseFloat(req.body.height)
            const weight = parseFloat(req.body.weight)
            const heaviness = req.body.heaviness
            const controlDegree = req.body.controlDegree
            const escalation = req.body.escalation
            const breath_heaviness = parseInt(req.body.breath_heaviness)
            const th2 = req.body.th2
            const eozinophilia = req.body.eozinophilia
            const IgE = req.body.IgE
            const allergAnamnez = req.body.allergAnamnez
            const allergIllnessId = parseInt(req.body.allergIllnessId)
            const choicePreparatOnBitId = parseInt(req.body.choicePreparatOnBitId)
            const dozaOnBIT = req.body.dozaOnBIT
            const needReceivBIT = req.body.needReceivBIT
            const bazisTherapyId = parseInt(req.body.bazisTherapyId)
            const quanDozKDBA = parseInt(req.body.quanDozKDBA)
            const baCourseIllnessId = parseInt(req.body.baCourseIllnessId)
            const controlAfterThreeMonths = req.body.controlAfterThreeMonths
            const SRB = req.body.SRB
            const gipercoagulation = req.body.gipercoagulation
            const cardioPatologId = parseInt(req.body.cardioPatologId)
            const failureCirculation = req.body.failureCirculation.toString()
            const sequence = req.body.sequence
            const dateInit = req.body.dateInit
            const dateControlEffect = req.body.dateControlEffect


            const response = await prisma.registrBronchPulm.create({
                data: {
                    secondName: secondName,
                    firstName: name,
                    patronomicName: patronomic,
                    birthDate: birthDate,
                    address: addressFact,
                    phone: phone,
                    lastHospitalizationDate: lastHospitalizationDate,
                    height: height,
                    weight: weight,
                    heaviness: heaviness,
                    controlDegree: controlDegree,
                    escalation: escalation,
                    breath_heaviness: breath_heaviness,
                    th2: th2,
                    eozinophilia: eozinophilia,
                    IgE: IgE,
                    allergAnamnez: allergAnamnez,
                    allerg_illness_id: allergIllnessId,
                    choice_preparat_on_bit_id: choicePreparatOnBitId,
                    dozaOnBIT: dozaOnBIT,
                    needReceivBIT: needReceivBIT,
                    bazis_therapy_id: bazisTherapyId,
                    quanDozKDBA: quanDozKDBA,
                    ba_course_illness_id: baCourseIllnessId,
                    controlAfterThreeMonths: controlAfterThreeMonths,
                    SRB: SRB,
                    gipercoagulation: gipercoagulation,
                    cardio_patolog_id: cardioPatologId,
                    failureCirculation: failureCirculation,
                    sequence: sequence,
                    dateInit: dateInit,
                    dateControlEffect: dateControlEffect

                }
            })
            /*
            INSERT INTO registry.registrBronchPulm (secondName, firstName, patronomicName, birthDate, address, phone, lastHospitalizationDate, height, weight,
                 heaviness, controlDegree, escalation, breath_heaviness, th2, eozinophilia, IgE, allergAnamnez, allerg_illness_id, 
                 choice_preparat_on_bit_id, dozaOnBIT, needReceivBIT, bazis_therapy_id, quanDozKDBA, ba_course_illness_id, controlAfterThreeMonths, 
                 SRB, gipercoagulation, cardio_patolog_id, failureCirculation, `sequence`, dateInit, dateControlEffect) 
            VALUES('Фамилия', 'Имя', 'Отчество', '2024-12-20', 'адрес', '444', '2012-12-20', 190.0, 87.0, '1', '1', '1', 1, '1', '1', '1', '1', 1, 2, '15', 15, 10, 15, 2, '15', '111', 111, 4, '4', '4', '2028-02-20', '2023-04-29');

            */



           /*  const response = await prisma.$queryRaw`
                    INSERT INTO registrBronchPulm (secondName, firstName, patronomicName, birthDate, address, phone, lastHospitalizationDate, height, weight,
                        heaviness, controlDegree, escalation, breath_heaviness, th2, eozinophilia, IgE, allergAnamnez, allerg_illness_id, 
                        choice_preparat_on_bit_id, dozaOnBIT, needReceivBIT, bazis_therapy_id, quanDozKDBA, ba_course_illness_id, controlAfterThreeMonths, 
                        SRB, gipercoagulation, cardio_patolog_id, failureCirculation, sequence, dateInit, dateControlEffect)
                    VALUES ( "${secondName}", "${name}","${patronomic}", "${birthDate.substring(0, 10)}", "${addressFact}", "${phone}","${lastHospitalizationDate}", "${height}", "${weight}", ${heaviness}, 
                            ${controlDegree}, ${escalation}, ${breath_heaviness}, ${th2}, "${eozinophilia}", "${IgE}", ${allergAnamnez}, ${allergIllnessId}, ${choicePreparatOnBitId}, 
                            "${dozaOnBIT}", ${needReceivBIT}, ${bazisTherapyId}, "${quanDozKDBA}", ${baCourseIllnessId}, "${controlAfterThreeMonths}", "${SRB}", ${gipercoagulation}, ${cardioPatologId}, 
                            ${failureCirculation}, "${sequence}", "${dateInit.substring(0, 10)}", "${dateControlEffect.substring(0, 10)}")
                    ` */
            res.send(response)
        }
        catch (e) {
            console.log(e);
        }
    }

}
module.exports = new DataController();
