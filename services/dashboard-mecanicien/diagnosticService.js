const Diagnostic = require('../../models/dashboard-mecanicien/Diagnostic');
const tokenUtil = require("../../utils/tokenUtil")
const etatConfig = require("../../config/etats")

class DiagnosticService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newDiagnostic = new Diagnostic(req.body);
        await newDiagnostic.save();
        return newDiagnostic;
    }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async updateService(req) {
        return Diagnostic.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async deleteService(req) {
       return Diagnostic.findByIdAndDelete(req.params.id);
   }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async insertManyService(req) {
        await Diagnostic.insertMany(req.body);
    }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findAllEffectuer(req) {
       return await this._diagnosticDynamic(req, 0)
   }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findAllAnnuler(req) {
       return await this._diagnosticDynamic(req, 1)
   }

   /**
     *
     * @param {Request} req
     * @param {Number} etatIndex
     * @returns {Promise<*>}
     * @private
     */
   async _diagnosticDynamic(req, etatIndex) {
       const user = tokenUtil.getDataFromRequestToken(req)
       if(user.profil === "client")
           return Diagnostic.find({ etat: etatConfig.ETAT_DIAGNOSTIC[etatIndex], "rdv.voiture.proprietaire": user.id })
               .populate('rdv')
       return Diagnostic.find({ etat: etatConfig.ETAT_DIAGNOSTIC[etatIndex] })
           .populate('rdv')
   }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async findByIdService(req) {
        return Diagnostic.findById(req.params.id)
            .populate("rdv")
            .populate("mecaniciens");
    }

}
module.exports = DiagnosticService;
