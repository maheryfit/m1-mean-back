const DemandeRDVDiagnostic = require('../../models/dashboard-client/DemandeRDVDiagnostic');
const Voiture = require('../../models/dashboard-client/Voiture');
const utils = require("../../utils/tokenUtil");
const etatConfig=require("../../config/etats");
const tokenUtil = require("../../utils/tokenUtil")
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
   async demandesRdvEnCours(req){
       return await this._demandeRdvDynamic(req, 0)
   }


    /**
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async demandesRdvRejeter(req){
        return await this._demandeRdvDynamic(req, 2)
    }

    /**
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async demandesRdvAccepter(req){
        return await this._demandeRdvDynamic(req, 1)
    }

    /**
     *
     * @param {Request} req
     * @param {Number} etatIndex
     * @returns {Promise<*>}
     * @private
     */
    async _demandeRdvDynamic(req, etatIndex) {
        const user = tokenUtil.getDataFromRequestToken(req)
        if(user.profil === "client")
            return DemandeRDVDiagnostic.find({ etat: etatConfig.ETAT_DEMANDE_RDV_DIAG[etatIndex], "voiture.proprietaire": user.id })
        return DemandeRDVDiagnostic.find({ etat: etatConfig.ETAT_DEMANDE_RDV_DIAG[etatIndex] });
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
        await Diagnostic.insertOne(diagnostic);
   }

}
module.exports = DemandeRDVDiagnosticService;
