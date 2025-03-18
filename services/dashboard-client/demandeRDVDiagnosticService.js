const DemandeRDVDiagnostic = require('../../models/dashboard-client/DemandeRDVDiagnostic');
const Voiture = require('../../models/dashboard-client/Voiture');
const utils = require("../../utils/tokenUtil");
const dateUtil = require("../../utils/dateUtil");
class DemandeRDVDiagnosticService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        await this._checkIfHavePermissionFromRequestBodyAndOtherModel(req)
        const newDemandeRDVDiagnostic = new DemandeRDVDiagnostic(req.body);
        await newDemandeRDVDiagnostic.save();
        return newDemandeRDVDiagnostic;
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<void>}
     */
   async _checkIfHavePermissionFromRequestBodyAndOtherModel(req) {
       await utils.checkIfHavePermissionFromRequestBodyAndOtherModel(req, Voiture,"voiture", "proprietaire")
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async updateService(req) {
       return DemandeRDVDiagnostic.findByIdAndUpdate(req.params.id,
           req.body, {new: true});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async deleteService(req) {
       return DemandeRDVDiagnostic.findByIdAndDelete(req.params.id);
   }

   /**
     *
     * @returns {Promise<*>}
     */
   async getAllService() {
       return DemandeRDVDiagnostic.find({});
   }


   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
       return DemandeRDVDiagnostic.findById(req.params.id)
           .populate("voiture");
   }

}
module.exports = DemandeRDVDiagnosticService;
