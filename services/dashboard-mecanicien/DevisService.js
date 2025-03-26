const Devis = require("../../models/dashboard-mecanicien/Devis");
const Maintenance = require("../../models/dashboard-mecanicien/Maintenance");
const etatConfig = require("../../config/etats")
const {startSession} = require("mongoose");
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
     * @returns {Promise<*>}
     */
    async deleteService(req) {
        return Devis.findByIdAndDelete(req.params.id);
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
     * @param {Request} req
     * @returns {Promise<void>}
     */
    async updateService(req) {
        const id = req.params.id
        const devis = await Devis.findById(id)
        let station;
        if(req.body.include("station"))
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
