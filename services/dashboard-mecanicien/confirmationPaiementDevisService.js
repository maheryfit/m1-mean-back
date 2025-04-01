const ConfirmationPaiementDevis = require('../../models/dashboard-mecanicien/ConfirmationPaiementDevis');
const PaiementDevis = require('../../models/dashboard-client/PaiementDevis');
const PaiementDevisStationService = require('./paiementDevisStationService');
const paiementDevisStationService = new PaiementDevisStationService();
const {startSession} = require("mongoose");
const etatConfig = require("../../config/etats");
const PaiementDevisService = require("../dashboard-client/paiementDevisService")
const tokenUtil = require("../../utils/tokenUtil");
const Mecanicien = require("../../models/dashboard-mecanicien/Mecanicien");
const paiementDevisService = new PaiementDevisService();
class ConfirmationPaiementDevisService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        await this._setMecanicien(req)
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
    async _setMecanicien(req) {
        const user = tokenUtil.getDataFromRequestToken(req)
        if(!user)
            throw new Error('User does not exist');
        const mecanicien = await Mecanicien.findOne({ utilisateur: user.id});
        if(!mecanicien)
            throw new Error('Mecanicien does not exist');
        req.body['mecanicien'] = mecanicien._id;
    }


    /**
     *
     * @param {Request} req
     * @returns {Promise<void>}
     * @private
     */
    async _modifyEtatPaiementDevis(req) {
        const paiement = await PaiementDevis.findById(req.body['paiementDevis'])
            .populate("devis")
        if (!paiement) {
            throw new Error('No paiement found.');
        }
        req.body["station"] = paiement.devis.station.toString()
        await paiementDevisService.checkIfDevisPayedFully(paiement.devis._id.toString(), paiement.montant)
        //await PaiementDevis.updateOne({ _id: req.body['paiementDevis'] }, { etat: etatConfig.ETAT_PAIEMENT_DEVIS[2], date_heure_validation: Date.now() });
        await PaiementDevis.updateOne({ _id: req.body['paiementDevis'] }, { etat: etatConfig.ETAT_PAIEMENT_DEVIS[2], date_heure_validation: req.body["date_heure_validation"] });
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
   async findAllService() {
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
module.exports = ConfirmationPaiementDevisService;
