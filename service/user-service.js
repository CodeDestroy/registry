const tokenService = require('./token-service')
const bcrypt = require('bcryptjs')
const ApiError = require('../exeptions/api-error');
const User = require('../models/User')
const Token = require('../models/Token')

class UserService {
    

    //registration method
    //role, secondName, firstName, patronomicName, district, login, password
    async registration (role, secondName, firstName, patronomicName, district, login, password) {
        try {
            //find candidate            
            const candidate = await prisma.users.findMany({
                where: {
                    login: login
                }
              });
              
            //if user already exists
            if (candidate.length > 0) {
                //send error
                throw ApiError.BadRequest(`Пользователь ${login} уже существует`)
            }

            //hash password
            const pass_to_hash = password.valueOf();
            const hashPassword = bcrypt.hashSync(pass_to_hash, 8);
            const user = await prisma.users.create({
                data: {
                    firstName: firstName, 
                    secondName: secondName, 
                    patronomicName: patronomicName, 
                    district: district, 
                    role: role, 
                    login: login, 
                    password: hashPassword
                }
            })
            //const user = await User.create({ firstName: firstName, secondName: secondName, patronomicName: patronomicName, district: district, role: role, login: login, password: hashPassword })
            const tokens = tokenService.generateTokens({...user});
            //save token to DB
            await tokenService.saveToken(user.id, tokens.refreshToken);
            
            //return userDto and tokens
            return { ...tokens, user: user }
        }
        catch (e) {
            console.log(e)
        }
    }

    //login
    async login(login, pass) {
        try {
            //find user
            const candidate = await prisma.users.findMany({
                where: {
                    login: login
                }
              });
            //if user already exists
            if (candidate.length == 0) {
                //send error
                throw ApiError.BadRequest(`Пользователь ${login} не найден`)
            }
            //check if passwor correct
            const isPassEquals = await bcrypt.compare(pass, candidate[0].password);
            //if not
            if (!isPassEquals) {
                return ApiError.BadRequest(`Пароль неверный`)
            }
            /* console.log(candidate[0].dataValues) */
            const tokens = tokenService.generateTokens({...candidate[0]});
            await tokenService.saveToken(candidate[0].id, tokens.refreshToken);
            //send answer (user and tokens)
            return { ...tokens, user: candidate }
        }
        catch (e) {
            console.log(e)
        }
    }
    
    //logout
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    //refresh auth
    async refresh(refreshToken) {
        try{
            if (!refreshToken){
                throw ApiError.UnauthorizedError();
            }
            const userData = await tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw ApiError.UnauthorizedError();
            }
            const candidate = await prisma.users.findMany({
                where: {
                    id: userData.id,
                }
              });
            //const userDto = await UserDto.deserialize(uirs_users_db, uirs_users, uirs_users_patients_doctors, doctor)
            const tokens = await tokenService.generateTokens({...candidate[0]});
            
            await tokenService.saveToken(candidate[0].id, tokens.refreshToken);
            //if all is ok - return user and new tokens
            return { ...tokens, user: candidate }
        }
        catch (e) {
            console.log(e)
        }
    }

    async getAccesses (user_id) {
        try {
            /* const accesses = await prisma.user_accesses.findMany({
                where: {
                    user_id: user_id
                }
            })
 */
            const result = await prisma.user_accesses.findMany({
                where: {
                    user_id: user_id
                },
                select: {
                    accessRegistry: {},
                },
              })

            /* await prisma.user.findMany({
                where: {
                  email: {
                    contains: 'prisma.io',
                  },
                },
                select: {
                  posts: {
                    where: {
                      published: false,
                    },
                    orderBy: {
                      title: 'asc',
                    },
                    select: {
                      title: true,
                    },
                  },
                },
              }) */
            return result
        }
        catch (e) {
            console.log(e)
        }
    }

}


module.exports = new UserService();