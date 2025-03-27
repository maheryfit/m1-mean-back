const PaiementDevis = require('../../models/dashboard-client/PaiementDevis');
const {Client} = require('../../models/dashboard-client/Client');
const {Devis} = require('../../models/dashboard-mecanicien/Devis');
const {startSession} = require("mongoose");
const tokenUtil = require("../../utils/tokenUtil");

class PaiementDevisService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        req = await this._setClient(req);
        req = await this._setDevis(req);
        let newPaiementDevis = new PaiementDevis(req.body);
        const session = await startSession();
        session.startTransaction()
        try {
            await newPaiementDevis.save();
            await session.commitTransaction()
            return newPaiementDevis;
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
    async _setDevis(req) {
        const devis = await Devis.findById(req.body['devis'])
        if (!devis) {
            throw new Error("Devis not found");
        }
        req.body['devis'] = devis;
        return req
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     * @private
     */
    async _setClient(req) {
        const client = await tokenUtil.getRealProfileUserFromRequestParam(req, Client)
        if (!client) {
            throw new Error("Client does not exist");
        }
        req.body['client'] = await Client.findById(client.id)
        return req
    }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async deleteService(req) {
       return PaiementDevis.findByIdAndDelete(req.params.id);
   }

   /**
    *
    * @returns {Promise<*>}
    */
   async getAllService() {
       return PaiementDevis.find({})
           .populate("client")
           .populate("abonnement");
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
       return PaiementDevis.findById(req.params.id)
           .populate("client")
           .populate("abonnement");
   }

}
module.exports = PaiementDevisService;
