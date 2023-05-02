/* const { Prisma, PrismaClient } = require("@prisma/client"); */
const { response } = require("express");
const jwt = require('jsonwebtoken');
const ApiError = require("../exeptions/api-error");
const User = require('../models/User')
const Token = require('../models/Token')
const userService = require('../service/user-service');
//const bodyParser = require('body-parser');


const secret = process.env.SECRET_ACCESS



class AuthController {

    async registration(req, res) {
        try {
            const role = req.body.role;
            const secondName = req.body.secondName;
            const firstName = req.body.firstName;
            const patronomicName = req.body.patronomicName;
            const district = req.body.district;
            const login = req.body.login;
            const password = req.body.password;
            const docktor = await userService.registration(role, secondName, firstName, patronomicName, district, login, password)
            /* const userData = await userService.registration(docktor.id, login, password, role_id); */
            res.cookie('refreshToken', docktor.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData);
        }
        catch (e) {
            console.log(e);
        }
    }

    async login(req, res) {
        try {
            const login = req.body.login;
            const password = req.body.password;
            const userData = await userService.login(login, password);
            if (userData.message != undefined)
                throw ApiError.BadRequest(userData.message)
                //console.log(userData)
            else {
                await res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                return res.status(200).json(userData);
            }
        }
        catch (e) {
            //console.log(e);
            res.status(401).send(e.message)
        }
    }

    async logout (req, res) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json(token);
        }
        catch (e) {
            console.log(e);
        }
    }

    async refresh (req, res) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            //console.log(userData)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData);
        }
        catch (e) {
            console.log(e);
        }
    }

    async getAccesses (req, res) {
        try {
            const user_id = req.body.user_id;
            const response = await userService.getAccesses(user_id)
            res.send(response)
        }
        catch(e) {
            console.log(e)
        }
    }


}
module.exports = new AuthController();
