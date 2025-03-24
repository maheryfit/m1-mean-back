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

            const maintenance = new Maintenance({
                station: req.body['station'],
                devis: devis._id
            })
            await maintenance.save()
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

}

module.exports=DevisService;
