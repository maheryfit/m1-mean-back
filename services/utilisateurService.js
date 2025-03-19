const tokenUtil = require('../utils/tokenUtil');
const User = require('../models/Utilisateur');
const user = new User()
const Voiture = require('../models/dashboard-client/Voiture')
const utils = require("../utils/tokenUtil");
const Utilisateur = require("../models/Utilisateur");

class UtilisateurService {

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
        const userToSend = {id: userToFind.id, nom_utilisateur: userToFind.nom_utilisateur, profil: userToFind.profil}
        return [tokenUtil.generateAccessToken(userToSend), userToSend]
    }

    /**
     *
     * @param {Request<?>} request
     * @returns {Promise<void>}
     */
    async registerService(request) {
        const user = new User(request.body)
        await user.save()
        const userToSend = {id: user.id, nom_utilisateur: user.nom_utilisateur, profil: user.profil}
        return [tokenUtil.generateAccessToken(userToSend), userToSend]
    }

    /**
     *
     * @param {Request<?>} request
     * @returns {void}
     */
    async registerManyService(request) {
        const data = request.body
        await User.insertMany(data)
    }

    getUsersService() {
        return User.find();
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<void>}
     */
    async _checkIfHavePermission(req) {
        await utils.checkIfHavePermission(req, Utilisateur, "_id")
    }


    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async findVoituresByUtilisateurIdService(req) {
        await this._checkIfHavePermission(req)
        const utilisateurId = req.params.id
        const result = await Voiture.aggregate([{ $match: { 'proprietaire': utilisateurId } }]);
        return await Voiture.populate(result, { path: "specification" });
    }
}

module.exports = UtilisateurService
