
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
        const user = await User.findAll({
            attributes: ['id', 'firstName', 'secondName', 'patronomicName', 'role', 'district', 'login', 'password'],
            where: {
                id: userId
            }
        })
        console.log(user[0].dataValues)
        let tokenData
        if (!user[0].dataValues.tokenId) {
            tokenData = await Token.create({token: refreshToken})
            console.log(tokenData.dataValues.id)
            /* const newUser = await User.update({tokenId: tokenData.dataValues.id}, { where: { id: userId } }) */
            /* const newUser = await User.update(

                // Set Attribute values 
                      { tokenId: tokenData.dataValues.id },
              
                // Where clause / criteria 
                       { _id : userId })
            console.log(newUser) */
            User.update(
                // Values to update
                {
                    tokenId:  tokenData.dataValues.id
                },
                { // Clause
                    where: 
                    {
                        _id: userId
                    }
                }
            ).then(count => {
                console.log('Rows updated ' + count);
            });
        }
        else {
            tokenData = await Token.update({ token: refreshToken }, {
                where: {
                    id: user[0].dataValues.tokenId
                }
              });
        }
        console.log(userId)
        
        
        return tokenData;
    }
 
    //remove token from DB
    async removeToken (refreshToken) {

        const tokenData = await Token.destroy({
            where: {
              token: refreshToken
            }
          });
        return tokenData;
    }

    //find token in DB
    async findToken (refreshToken) {

        const tokenData = await Token.findAll({
            where: {
                token: refreshToken,
            }
        })
        return tokenData[0];
    }

}

module.exports = new TokenService();