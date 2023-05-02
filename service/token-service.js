
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secretAccess = process.env.SECRET_ACCESS
const secretRefresh = process.env.SECRET_REFRESH
const Token = require('../models/Token')
const User = require('../models/User')
//const tokenModel = require('../models/tokenModel')


class TokenService {
    

    //generate new tokens
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, secretAccess, {expiresIn: "30m"})
        const refreshToken = jwt.sign(payload, secretRefresh, {expiresIn: "30d"})

        return {
            accessToken,
            refreshToken,
        }
    }

    //check if access token is correct
    validateAccessToken (token) {
        try {
            const userData = jwt.verify(token, secretAccess);
            return userData
        }
        catch(e) {
            return null;
        }
    }


    //check if refresh token is ok
    async validateRefreshToken (token) {
        try {
            const userData = await jwt.verify(token, secretRefresh);
            return userData
        }
        catch(e) {
            return console.log(e);
        }
    }

    //save refresh token to DB
    async saveToken (userId, refreshToken) {
        let tokenData
        const tokens = await prisma.tokens.findMany({
            where: {
                userId: userId
            }
        })
        if (tokens.length == 0) {
            tokenData = await prisma.tokens.create({
                data: {
                    token: refreshToken
                }}
            )
        }
        else {
            tokenData = await prisma.tokens.updateMany({
                where: {
                    userId: userId
                },
                data: {
                    token: refreshToken
                }
            })
        }
        console.log(tokenData)
        
        tokenData = await prisma.tokens.findFirst({
            where: {
                userId: userId
            }
        })
        
        
        return tokenData;
    }
 
    //remove token from DB
    async removeToken (refreshToken) {

        const tokenData = await prisma.tokens.deleteMany({
            where: {
                token:refreshToken
            },
          })
/*         const tokenData = await Token.destroy({
            where: {
              token: refreshToken
            }
          }); */
        return tokenData;
    }

    //find token in DB
    async findToken (refreshToken) {

        const tokens = await prisma.tokens.findMany({
            where: {
                token: refreshToken
            }
        })
        return tokens[0];
    }

}

module.exports = new TokenService();