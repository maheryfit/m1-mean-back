const {Devis} = require("../../models/dashboard-mecanicien/Devis");
const Voiture = require("../../models/dashboard-client/Voiture")
const Client = require("../../models/dashboard-client/Client")
const etatConfig = require("../../config/etats")
const tokenUtil = require("../../utils/tokenUtil")

const Article = require("../../models/dashboard-mecanicien/Article");
const Service = require("../../models/dashboard-mecanicien/Service");

const {startSession} = require("mongoose");
const Maintenance = require("../../models/dashboard-mecanicien/Maintenance");
const { ObjectId } = require('mongodb');
const DemandeRDVDiagnosticService = require("../dashboard-client/demandeRDVDiagnosticService");

class DevisService{
    constructor(){}

    /**
     *
     * @param {Request} req
     */
    async createService(req){
        const demandeService=new DemandeRDVDiagnosticService();
        const session = await startSession();
        session.startTransaction()
        try {
            await this._insertRemise(req)
            await this._getTotalDevisWithRemise(req)
            await this._setDureeEstimeeDansRequete(req)
            const devis=new Devis(req.body);
            await devis.save();
            await this._insertMaintenance(req.body["dateheure_debut_maintenance"], req.body['station'], devis._id)
            await demandeService.accepterDemandeRDV(req);
            await session.commitTransaction()
            return devis;
        } catch (error) {
            await session.abortTransaction()
            throw error;
        } finally {
            await session.endSession()
        }
    }

    /**
     *
     * @param {string} serviceId
     * @returns {Promise<Number>}
     * @private
     */
    async _getPrixService(serviceId){
        const service = await Service.findById(serviceId);
        if(!service){
            throw new Error(`Service ${serviceId} not found`)
        }
        return service.tarif
    }


    /**
     *
     * @param {Request} req
     * @param devis
     * @returns {Promise<number>}
     * @private
     */
    async _getPrixServices(req, devis = null) {
        let services
        if('services' in req.body){
            services = req.body.services
        } else {
            services = devis.services
        }
        let sum = 0
        for(let i = 0, len = services.length; i < len; i++){
            sum += Number.parseFloat(await this._getPrixService(services[i]));
        }
        return sum;
    }

    /**
     *
     * @param {string} articleId
     * @returns {Promise<Number>}
     * @private
     */
    async _getPrixArticle(articleId){
        const article = await Article.findById(articleId);
        if(!article){
            throw new Error(`Service ${articleId} not found`)
        }
        return article.prix_unitaire
    }

    /**
     *
     * @param {Request} req
     * @param devis
     * @returns {Promise<number>}
     * @private
     */
    async _getPrixArticles(req, devis = null) {
        let articles_quantites
        if('articles_quantites' in req.body){
            articles_quantites = req.body.articles_quantites
        } else {
            articles_quantites = devis.articles_quantites
        }
        let sum = 0
        for(let i = 0, len = articles_quantites.length; i < len; i++){
            sum += (await this._getPrixArticle(articles_quantites[i].article) * parseFloat(articles_quantites[i].quantite) );
        }
        return sum;
    }

    /**
     *
     * @param {Request} req
     * @param devis
     * @returns {Promise<number>}
     * @private
     */
    async _getTotalDevis(req, devis = null) {
        const article = await this._getPrixArticles(req, devis)
        const service = await this._getPrixServices(req, devis)
        return article + service;
    }

    /**
     *
     * @param {Request} req
     * @param devis
     * @returns {Promise<number>}
     * @private
     */
    async _getTotalDevisWithRemise(req, devis = null )  {
        const totalDevis = await this._getTotalDevis(req, devis);
        let total = 0
        let remises
        if('remises' in req.body) {
            remises = req.body.remises;
        } else {
            if(devis != null)
                remises = devis.remises;
            else
                remises = []
        }
        for (let i = 0, len = remises.length; i < len; i++){
            total = ((totalDevis * remises[i]['valeurRemise']) / 100) + total;
        }
        req.body["montant"] = totalDevis - total;
    }

    /**
     * @param {string| Date} dateheure_debut_maintenance
     * @param {string} station
     * @param {string} devis_id
     * @returns {Promise<void>}
     * @private
     */
    async _insertMaintenance(dateheure_debut_maintenance, station, devis_id) {
        const maintenance = new Maintenance({
            station: station,
            dateheure_debut: dateheure_debut_maintenance,
            devis: devis_id
        })
        await maintenance.save()
    }

    /**
     *
     * @param {Request} req
     * @param devis
     * @returns {Promise<Request>}
     * @private
     */
    async _insertRemise(req, devis = null) {
        let voiture;
        if("voiture" in req.body)
            voiture = await Voiture.findById(req.body["voiture"])
        else {
            voiture = devis['voiture']
        }
        if(voiture === undefined)
            throw new Error("Voiture not found")
        const client = await Client.findOne({utilisateur: voiture.proprietaire.toString()})
            .populate("abonnement")
            .populate("statut_client")
        if (client.abonnement != null || client.statut_client != null) {
            req.body['remises'] = []
            if (client.abonnement != null) {
                req.body['remises'] = {
                    nomRemise: client.abonnement['nom'],
                    valeurRemise: client.abonnement['pourcentage_reduction']
                }
            }
            if(client.statut_client != null) {
                req.body['remises'] = {
                    nomRemise: client.statut_client['titre'],
                    valeurRemise: client.statut_client['pourcentage_reduction']
                }
            }
        }
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async deleteService(req) {
        const session = await startSession();
        session.startTransaction()
        try {
            await Maintenance.deleteMany({ devis: req.params.id })
            const devis = Devis.findByIdAndDelete(req.params.id);
            await session.commitTransaction()
            return devis;
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
     * @returns {Promise<*>}
     */
    async annulerService(req) {
        return Devis.updateOne({ id: req.params.id}, { etat: etatConfig.ETAT_DEVIS[2] });
    }


    /**
     *
     * @returns {Promise<*>}
     */
    async getAllService() {
        return await this._getAllServiceDynamic({})
    }

    /**
     * @param {Object} condition
     * @returns {Promise<*>}
     */
    async _getAllServiceDynamic(condition) {
        const responses = await Devis.find(condition)
            .populate('voiture')
            .populate("station")
            .lean()
        responses.map(response => {
            response["montant"] = Number.parseFloat(response["montant"].toString());
        });
        return responses;
    }

    /**
     *
     * @returns {Promise<*>}
     */
    async getAllServiceByStation(req) {
        const station = req.params.station;
        return await this._getAllServiceDynamic({
            station: new ObjectId(station),
            etat: etatConfig.ETAT_DEVIS[1]
        })
    }


    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async getDevisCreer(req) {
        return await this._devisDynamic(req, 0)
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async getDevisPayer(req) {
        return await this._devisDynamic(req, 1)
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async getDevisAnnuler(req) {
        return await this._devisDynamic(req, 2)
    }

    /**
     *
     * @param {Request} req
     * @param {Number} etatIndex
     * @returns {Promise<*>}
     * @private
     */
    async _devisDynamic(req, etatIndex) {
        const user = tokenUtil.getDataFromRequestToken(req)
        if(user.profil === "client") {
            const voitures = await Voiture.find({proprietaire: user.id}).select({"_id": 1})
            return Devis.find({ etat: etatConfig.ETAT_DEVIS[etatIndex], voiture: voitures })
                .populate('voiture')
                .populate("station")
        }
        return Devis.find({ etat: etatConfig.ETAT_DEVIS[etatIndex] })
            .populate('voiture')
            .populate("station")
    }

    /**
     *
     * @param req
     * @returns {Promise<*>}
     *
     */
    async findByIdService(req) {
        return Devis.findById(req.params.id)
            .populate({
                path:"voiture",
                populate:{
                    path:"proprietaire",
                    select:"nom prenom nom_utilisateur"
                }
            })
            .populate("station")
            .populate({
                path:"mecanicien",
                populate:{
                    path:"utilisateur",
                    select:"nom prenom nom_utilisateur"
                }
            })
            //.populate("main_oeuvres")
            .populate({
                path: "articles_quantites",
                populate: {
                    path: "article"
                }
            })
            .populate("remises")
            .populate("services");
    }

    async findByIdDemande(req) {
        const iddemande=req.params.iddemande;
        return Devis.find({diagnostic:iddemande})
            .populate({
                path:"voiture",
                populate:{
                    path:"proprietaire",
                    select:"nom prenom nom_utilisateur"
                }
            })
            .populate("station")
            .populate({
                path:"mecanicien",
                populate:{
                    path:"utilisateur",
                    select:"nom prenom nom_utilisateur"
                }
            })
            //.populate("main_oeuvres")
            .populate({
                path: "articles_quantites.article",
                populate:{
                    path:"marque"
                }
            })
            .populate("remises")
            .populate("services");
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<void>}
     */
    async updateService(req) {
        const id = req.params.id
        const devis = await Devis.findById(id).populate("voiture")
        let station;
        let dateheure_debut_maintenance
        if("station" in req.body)
            station = req.body['station']
        else
            station = devis.station
        if("dateheure_debut_maintenance" in req.body)
            dateheure_debut_maintenance = req.body['dateheure_debut_maintenance']
        else
            dateheure_debut_maintenance = devis.dateheure_debut_maintenance
        const session = await startSession();
        session.startTransaction()
        try {
            await this._insertRemise(req, devis)
            await this._getTotalDevisWithRemise(req, devis)
            await Maintenance.updateMany({devis: id}, { station: station, dateheure_debut_maintenance: dateheure_debut_maintenance })
            await session.commitTransaction()
            return await Devis.findByIdAndUpdate(id, req.body, {new: true})
        } catch (error) {
            await session.abortTransaction()
            throw error;
        } finally {
            await session.endSession()
        }
    }
    
    async _setDureeEstimeeDansRequete(req){
        const dureeEstimee=await this._getDureeServices(req.body.services);
        req.body.duree_estimee=dureeEstimee;
    }
    async _getDureeServices(services){
        const idservices=[];
        for(let i=0;i<services.length;i++){
            idservices.push(new ObjectId(services[i]));
        }
        const resultat=await Service.aggregate([
            {
                $match:{_id:{$in:idservices}}
            },
            {
                $group:{
                    _id:null,
                    duree_estimee:{$sum:"$duree_estimee"}
                }
            }
        ]);
        const dureeEstimee=resultat[0]?.duree_estimee||0;
        return dureeEstimee;
    }
}

module.exports=DevisService;
