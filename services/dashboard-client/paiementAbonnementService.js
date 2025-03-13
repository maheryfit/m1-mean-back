const PaiementAbonnement = require('../../models/dashboard-client/PaiementAbonnement');
const Client = require('../../models/dashboard-client/Client');
const Abonnement = require('../../models/dashboard-client/Abonnement');
const {startSession} = require("mongoose");

class PaiementAbonnementService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newPaiementAbonnement = new PaiementAbonnement(req.body);
        await this._setMontantPayeFromAbonnement(newPaiementAbonnement);
        const session = await startSession();
        session.startTransaction()
        try {
            await newPaiementAbonnement.save();
            await this._modifyAbonnementClient(newPaiementAbonnement);
            await session.commitTransaction()
            return newPaiementAbonnement;
        } catch (error) {
            await session.abortTransaction()
            throw error;
        } finally {
            await session.endSession()
        }
    }

    async _modifyAbonnementClient(paiementAbonnement) {
        // Modification du paiement de l'abonnement du client
        const client = await Client.findById(paiementAbonnement.client.toString());
        if (!client) {
            throw new Error('Client does not exist');
        }
        await Client.updateOne({ _id: client._id }, { abonnement: paiementAbonnement.abonnement.toString() })
    }

    async _setMontantPayeFromAbonnement(paiementAbonnement) {
        const abonnement = await Abonnement.findById(paiementAbonnement.abonnement.toString());
        if (!abonnement) {
            throw new Error('Abonnement not found');
        }
        paiementAbonnement.montant_paye = abonnement.prix
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
       return PaiementAbonnement.find({});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
       return PaiementAbonnement.findById(req.params.id);
   }

}
module.exports = PaiementAbonnementService;
