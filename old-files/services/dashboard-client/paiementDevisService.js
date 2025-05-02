const PaiementDevis = require('../../models/dashboard-client/PaiementDevis');
const {Devis} = require('../../models/dashboard-mecanicien/Devis');
const {startSession} = require("mongoose");
const tokenUtil = require("../../utils/tokenUtil");
const etatConfig = require("../../config/etats");
const Client = require("../../models/dashboard-client/Client")
const {ObjectId} = require("mongodb");

class PaiementDevisService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createServicePaiement(req) {
        await this._setClient(req);
        let newPaiementDevis = new PaiementDevis(req.body);
        const session = await startSession();
        session.startTransaction()
        try {
            await this._checkIfDevisPayedFully(req.body["devis"], req.body["montant"], etatConfig.ETAT_PAIEMENT_DEVIS[0])
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
    }


    /**
     *
     * @param {string} devis_id
     * @param {Number} montant
     * @returns {Promise<void>}
     */
    async checkIfDevisPayedFully(devis_id, montant) {
        const {sumDevis, totalDevis} = await this._checkIfDevisPayedFully(devis_id, montant, etatConfig.ETAT_PAIEMENT_DEVIS[2]);
        if(sumDevis + Number.parseFloat(montant) === totalDevis){
            await Devis.updateOne( { _id: devis_id }, { etat: etatConfig.ETAT_DEVIS[1] } );
        }
    }

    /**
     *
     * @param {string} devis_id
     * @param {Number} montant
     * @param {string} state
     * @returns {Promise<void>}
     * @private
     */
    async _checkIfDevisPayedFully(devis_id, montant, state) {
        const devis = await Devis.findOne({ _id: devis_id });
        if (devis.etat === etatConfig.ETAT_DEVIS[1])
            throw new Error(`Devis pleinement payé`);
        const sumDevis = await this._getSumDevis(devis_id, state);
        const totalDevis = Number.parseFloat(devis.montant)
        if (sumDevis + Number.parseFloat(montant) > totalDevis) {
            throw new Error(`Il vous reste à payer ${totalDevis - sumDevis}`);
        }
        return {sumDevis, totalDevis};
    }

    /**
     *
     * @param {string} devis
     * @param {string} state
     * @returns {Promise<number>}
     * @private
     */
    async _getSumDevis(devis, state) {
        const result = await PaiementDevis.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ["$devis", new ObjectId(devis)] },
                            { $eq: ["$etat", state]}
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    sumDevis: { $sum: "$montant" }
                }
            }
        ])
        const resp = result[0]?.sumDevis || 0;
        return Number.parseFloat(resp)
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
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async getPaiementEffectuer(req) {
        return await this._paiementDevisDynamic(req, 0)
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async getPaiementAnnuler(req) {
        return await this._paiementDevisDynamic(req, 1)
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async getPaiementValider(req) {
        return await this._paiementDevisDynamic(req, 2)
   }

   /**
     *
     * @param {Request} req
     * @param {Number} etatIndex
     * @returns {Promise<*>}
     * @private
     */
   async _paiementDevisDynamic(req, etatIndex) {
       const user = tokenUtil.getDataFromRequestToken(req)
       if(!user) {
           throw new Error("User not found");
       }
       if(user.profil === "client") {
           const client = await Client.findOne({ utilisateur: user.id });
           return PaiementDevis.find({ etat: etatConfig.ETAT_PAIEMENT_DEVIS[etatIndex], client: client._id })
               .populate('client')
       }
       return PaiementDevis.find({ etat: etatConfig.ETAT_PAIEMENT_DEVIS[etatIndex] })
           .populate('client')
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
