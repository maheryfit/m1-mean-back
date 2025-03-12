const tokenUtil = require('../utils/tokenUtil');
const User = require('../models/User');
const {getDataFromRequestToken} = require("../utils/tokenUtil");

const user = new User()

class AuthService {

    constructor() {
    }

    /**
     * @param {Request<?>} request
     */
    async loginService(request) {
        const username = request.body['username'];
        const password = request.body['password'];

        const userToFind = await user.findUsingUsername(username)
        if(!userToFind)
            throw new Error("User not found")
        const isMatch = await userToFind.comparePassword(password)
        if(!isMatch)
            throw new Error("Password doesn't match")
        return tokenUtil.generateAccessToken({id: userToFind.id, username: userToFind.username, role: userToFind.role})
    }

    /**
     *
     * @param {Request<?>} request
     * @returns {Promise<void>}
     */
    async registerService(request) {
        const user = new User(request.body)
        await user.save()
        return tokenUtil.generateAccessToken({id: user.id, username: user.username, role: user.role})
    }

    /**
     *
     * @param {Request} request
     * @returns {*}
     */
    refreshTokenService(request) {
        const user = getDataFromRequestToken(request)
        return tokenUtil.generateAccessToken({id: user.id, username: user.username, role: user.role})
    }

    getUsersService() {
        return User.find();
    }
}

module.exports = AuthService
