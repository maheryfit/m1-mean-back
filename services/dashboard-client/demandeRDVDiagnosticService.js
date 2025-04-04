const DemandeRDVDiagnostic = require('../../models/dashboard-client/DemandeRDVDiagnostic');
const Voiture = require('../../models/dashboard-client/Voiture');
const utils = require("../../utils/tokenUtil");
const etatConfig=require("../../config/etats");
const tokenUtil = require("../../utils/tokenUtil")
const Diagnostic = require('../../models/dashboard-mecanicien/Diagnostic');
const { default: mongoose } = require('mongoose');
const ObjectId=mongoose.Types.ObjectId;
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

   async findByIdServiceMecanicien(req) {
    return DemandeRDVDiagnostic.findById(req.params.id)
        .populate("station")
        .populate({
            path: "voiture",
            populate:{
                path:"proprietaire",
                select:"nom prenom nom_utilisateur"
            }
        });
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

    async _demandeRdvDynamicPaginate(req) {
        const index=Number(req.params.index);
        const pageLimit=Number(req.params.pagelimit);
        const user = tokenUtil.getDataFromRequestToken(req)
        if(user.profil === "client")
            return DemandeRDVDiagnostic.aggregate([
                {
                    $skip:(index-1)*pageLimit
                },
                {
                    $limit: pageLimit
                },
                {
                    $lookup:{
                        from:"voitures",
                        localField:"voiture",
                        foreignField:"_id",
                        as:"voiture"
                    }
                },
                {
                    $unwind:"$voiture"
                },
                {
                    $match: { "voiture.proprietaire":new ObjectId(user.id) }
                },
                {
                    $lookup:{
                        from:"stations",
                        localField:"station",
                        foreignField:"_id",
                        as:"station"
                    }
                },
                {
                    $unwind:"$station"
                }
            ])
        return DemandeRDVDiagnostic.find()
            .skip((index-1)*pageLimit)
            .limit(pageLimit)
            .populate({
                path:"voiture",
                populate:{
                    path:"proprietaire",
                    select:"nom prenom nom_utilisateur"
                }
            }).populate("station");
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
        diagnostic.rdv=new ObjectId(idrdv);
        let mecaniciens=[];
        for(let i=0;i<diagnostic.mecaniciens.length;i++){
            mecaniciens.push(new ObjectId(diagnostic.mecaniciens[i]))
        }
        diagnostic.mecaniciens=mecaniciens;
        return await Diagnostic.insertOne(diagnostic);
   }

   async count(req){
    const user=utils.getDataFromRequestToken(req);
    if(user.profil==='client'){
        return DemandeRDVDiagnostic.aggregate([
            {
                $lookup:{
                    from:"voitures",
                    localField:"voiture",
                    foreignField:"_id",
                    as:"voiture"
                }
            },
            {
                $unwind:"$voiture"
            },
            {
                $match: { "voiture.proprietaire":new ObjectId(user.id) }
            },
            {
                $count: "count"
            }
        ]);    
    }
    return DemandeRDVDiagnostic.aggregate([
        {
            $count: "count"
        }
    ]);
   }

}
module.exports = DemandeRDVDiagnosticService;
