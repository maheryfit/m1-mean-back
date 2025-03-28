const PaiementAbonnement = require('../../models/dashboard-client/PaiementAbonnement');
const Client = require('../../models/dashboard-client/Client');
const {Abonnement} = require('../../models/dashboard-client/Abonnement');
const {startSession} = require("mongoose");
const tokenUtil = require("../../utils/tokenUtil");

class PaiementAbonnementService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        req = await this._setAbonnement(req)
        req = await this._setClient(req)
        req = await this._setMontantPayeFromAbonnement(req);
        let newPaiementAbonnement = new PaiementAbonnement(req.body);
        const session = await startSession();
        session.startTransaction()
        try {
            await newPaiementAbonnement.save();
            await this._modifyAbonnementClient(req);
            await session.commitTransaction()
            return newPaiementAbonnement;
        } catch (error) {
            await session.abortTransaction()
            throw error;
        } finally {
            await session.endSession()
        }
    }


    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     * @private
     */
    async _setAbonnement(req) {
        const abonnement = await Abonnement.findById(req.body['abonnement'])
        if(!abonnement)
            throw new Error('Client does not exist');
        req.body['abonnement'] = abonnement;
        return req
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<void>}
     * @private
     */
    async _setClient(req) {
        const user = tokenUtil.getDataFromRequestToken(req)
        if(!user)
            throw new Error('User does not exist');
        const client = await Client.findOne({ utilisateur: user.id});
        if(!client)
            throw new Error('Client does not exist');
        req.body['client'] = client._id;
        return req
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     * @private
     */
    async _modifyAbonnementClient(req) {
        // Modification du paiement de l'abonnement du client
        const client = req.body['client']
        const abonnement = req.body['abonnement'];
        await Client.updateOne({ _id: client }, { abonnement: abonnement._id.toString() })
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     * @private
     */
    async _setMontantPayeFromAbonnement(req) {
        req.body.montant = req.body.abonnement.prix
        return req;
    }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async deleteService(req) {
       return PaiementAbonnement.findByIdAndDelete(req.params.id);
   }

   /**
    *
    * @returns {Promise<*>}
    */
   async getAllService() {
       return PaiementAbonnement.find({})
           .populate("client")
           .populate("abonnement");
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
       return PaiementAbonnement.findById(req.params.id)
           .populate("client")
           .populate("abonnement");
   }

}
module.exports = PaiementAbonnementService;
