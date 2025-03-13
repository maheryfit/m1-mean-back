const tokenUtil = require('../utils/tokenUtil');
const User = require('../models/Utilisateur');
const user = new User()

class AuthentificationService {

    constructor() {
    }

    /**
     * @param {Request<?>} request
     */
    async loginService(request) {
        const username = request.body['nom_utilisateur'];
        const password = request.body['mot_de_passe'];

        const userToFind = await user.findUsingUsername(username)
        if(!userToFind)
            throw new Error("User not found")
        const isMatch = await userToFind.comparePassword(password)
        if(!isMatch)
            throw new Error("Password doesn't match")
        return tokenUtil.generateAccessToken({id: userToFind.id, nom_utilisateur: userToFind.nom_utilisateur, profil: userToFind.profil})
    }

    /**
     *
     * @param {Request<?>} request
     * @returns {Promise<void>}
     */
    async registerService(request) {
        const user = new User(request.body)
        await user.save()
        return tokenUtil.generateAccessToken({id: user.id, nom_utilisateur: user.nom_utilisateur, profil: user.profil})
    }

    getUsersService() {
        return User.find();
    }
}

module.exports = AuthentificationService
