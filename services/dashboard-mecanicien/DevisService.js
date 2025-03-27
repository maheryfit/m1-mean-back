const Devis = require("../../models/dashboard-mecanicien/Devis");
const Voiture = require("../../models/dashboard-client/Voiture")
const Client = require("../../models/dashboard-client/Client")
const etatConfig = require("../../config/etats")
const tokenUtil = require("../../utils/tokenUtil")
const {startSession} = require("mongoose");
const Maintenance = require("../../models/dashboard-mecanicien/Maintenance");

class DevisService{
    constructor(){}

    /**
     *
     * @param {Request} req
     */
    async createService(req){
        const session = await startSession();
        session.startTransaction()
        try {
            await this._insertRemise(req)
            const devis=new Devis(req.body);
            await devis.save();
            await this._insertMaintenance(req.body['station'], devis._id)
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
     * @param {string} station
     * @param {string} devis_id
     * @returns {Promise<void>}
     * @private
     */
    async _insertMaintenance(station, devis_id) {
        const maintenance = new Maintenance({
            station: station,
            devis: devis_id
        })
        await maintenance.save()
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<Request>}
     * @private
     */
    async _insertRemise(req) {
        const voiture = await Voiture.findById(req.body["voiture"])
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
        return req
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
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async payerService(req) {
        return Devis.updateOne({ id: req.params.id}, { etat: etatConfig.ETAT_DEVIS[1] });
    }

    /**
     *
     * @returns {Promise<*>}
     */
    async getAllService() {
        return Devis.find({})
            .populate('voiture')
            .populate("station")
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
        if(user.profil === "client")
            return Devis.find({ etat: etatConfig.ETAT_DEVIS[etatIndex], "voiture.proprietaire": user.id })
                .populate('voiture')
                .populate("station")
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
            .populate("voiture")
            .populate("station")
            .populate("mecanicien")
            .populate("main_oeuvres")
            .populate("articles")
            .populate("remises")
            .populate({
                path: "voiture",
                populate: {
                    path: "proprietaire",
                    model: "Utilisateurs",
                }
            });
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<void>}
     */
    async updateService(req) {
        const id = req.params.id
        const devis = await Devis.findById(id)
        let station;
        if("station" in req.body)
            station = req.body['station']
        else
            station = devis.station
        const session = await startSession();
        session.startTransaction()
        try {
            await Maintenance.updateMany({devis: id}, { station: station })
            await session.commitTransaction()
            return await Devis.findByIdAndUpdate(id, req.body, {new: true})
        } catch (error) {
            await session.abortTransaction()
            throw error;
        } finally {
            await session.endSession()
        }
    }

}

module.exports=DevisService;
