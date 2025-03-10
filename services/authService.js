
const User = require('../models/User');

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
        userToFind.password = ""
        return userToFind
    }

    /**
     *
     * @param {Request<?>} request
     * @returns {Promise<void>}
     */
    async registerService(request) {
        const user = new User(request.body)
        await user.save()
        return user
    }
}

module.exports = AuthService
