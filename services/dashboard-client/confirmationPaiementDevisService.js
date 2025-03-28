const ConfirmationPaiementDevis = require('../../models/dashboard-client/ConfirmationPaiementDevis');
const PaiementDevis = require('../../models/dashboard-client/PaiementDevis');
const PaiementDevisStationService = require('./paiementDevisStationService');
const paiementDevisStationService = new PaiementDevisStationService();
const {startSession} = require("mongoose");
const etatConfig = require("../../config/etats");
class ConfirmationConfirmationPaiementDevisService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        let newConfirmationPaiementDevis = new ConfirmationPaiementDevis(req.body);
        const session = await startSession();
        session.startTransaction()
        try {
            await newConfirmationPaiementDevis.save();
            await this._modifyEtatPaiementDevis(req)
            await paiementDevisStationService.createService(req)
            await session.commitTransaction()
            return newConfirmationPaiementDevis;
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
     * @returns {Promise<void>}
     * @private
     */
    async _modifyEtatPaiementDevis(req) {
        await PaiementDevis.updateOne({ id: req.body['paiement'] }, { etat: etatConfig.ETAT_PAIEMENT_DEVIS[2], date_heure_validation: Date.now() });
    }


   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async deleteService(req) {
       return ConfirmationPaiementDevis.findByIdAndDelete(req.params.id);
   }

   /**
    *
    * @returns {Promise<*>}
    */
   async getAllService() {
       return ConfirmationPaiementDevis.find({})
           .populate("paiementDevis")
           .populate("mecanicien");
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
       return ConfirmationPaiementDevis.findById(req.params.id)
            .populate("paiementDevis")
            .populate("mecanicien");
   }

}
module.exports = ConfirmationConfirmationPaiementDevisService;
