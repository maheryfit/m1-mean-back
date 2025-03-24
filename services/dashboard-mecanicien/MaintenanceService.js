const Maintenance = require("../../models/dashboard-mecanicien/Maintenance");

class MaintenanceService{

    constructor(){}

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newMaintenance = new Maintenance(req.body);
        await newMaintenance.save();
        return newMaintenance;
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async addDetailMaintenance(req) {
        const newMaintenance = new Maintenance(req.body);
        await newMaintenance.save();
        return newMaintenance;
    }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async updateService(req) {
        return Maintenance.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
   }


}
module.exports=MaintenanceService;
