const PaiementDevis = require('../../models/dashboard-client/PaiementDevis');
const {Devis} = require('../../models/dashboard-mecanicien/Devis');
const {startSession} = require("mongoose");
const tokenUtil = require("../../utils/tokenUtil");
const etatConfig = require("../../config/etats");
const Client = require("../../models/dashboard-client/Client")

class PaiementDevisService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        let newPaiementDevis = new PaiementDevis(req.body);
        const session = await startSession();
        session.startTransaction()
        try {
            await this._checkIfDevisPayedFully(req)
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
    async _checkIfDevisPayedFully(req) {
        const devis = await Devis.findOne({ id: req.body["devis"] });
        if (devis.etat === etatConfig.ETAT_DEVIS[1])
            throw new Error(`Devis pleinement payé`);
        const sumDevis = await this._getSumDevis(req.body["devis"]) + Number.parseFloat(req.body["montant"]);
        const totalDevis = devis.montant
        if (sumDevis >= totalDevis) {
            throw new Error(`Le total de montant que vous avez payé: ${sumDevis} est supérieur au prix total du devis: ${totalDevis}`);
        }
        if(sumDevis === totalDevis){
            await Devis.updateOne( { id: req.body["devis"] }, { etat: etatConfig.ETAT_DEVIS[1] } );
        }
    }

    /**
     *
     * @param devis
     * @returns {Promise<number>}
     * @private
     */
    async _getSumDevis(devis) {
        const etats = [etatConfig.ETAT_PAIEMENT_DEVIS[0], etatConfig.ETAT_PAIEMENT_DEVIS[2]]
        const result = await PaiementDevis.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ["devis", devis] },
                            { $eq: ["etat", etats] }
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
               .populate('voiture')
               .populate("station")
       }
       return PaiementDevis.find({ etat: etatConfig.ETAT_PAIEMENT_DEVIS[etatIndex] })
           .populate('voiture')
           .populate("station")
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
