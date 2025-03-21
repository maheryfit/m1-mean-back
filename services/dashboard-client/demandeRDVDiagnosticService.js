const DemandeRDVDiagnostic = require('../../models/dashboard-client/DemandeRDVDiagnostic');
const Voiture = require('../../models/dashboard-client/Voiture');
const utils = require("../../utils/tokenUtil");
const dateUtil = require("../../utils/dateUtil");
const etatConfig=require("../../config/etats");
const Diagnostic = require('../../models/dashboard-mecanicien/Diagnostic');
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
     * @returns {Promise<*>}
     */
    async createManyService(req) {
        await DemandeRDVDiagnostic.insertMany(req.body)
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
           .populate("station")
           .populate("voiture");
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async demandesRdvEnCours(){
    return DemandeRDVDiagnostic.find({ etat: etatConfig.ETAT_DEMANDE_RDV_DIAG[0] });
   }

   /**
    * 
    * @param {Request} req 
    * @returns 
    */
   async actionDemandeRdv(req){
    return DemandeRDVDiagnostic.findByIdAndUpdate(req.params.id, req.body, {runValidators:true, new:true});
   }

   /**
    * 
    * @param {Request} req 
    */
   async ajoutDiagnostic(req){
    const idrdv=req.params.idrdv;
    let diagnostic=req.body;
    diagnostic.rdv={
      $oid: idrdv
    };
    return Diagnostic.insertOne(diagnostic);
   }

}
module.exports = DemandeRDVDiagnosticService;
