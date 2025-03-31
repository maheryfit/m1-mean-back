const Maintenance = require("../../models/dashboard-mecanicien/Maintenance");
const ServiceService = require("./serviceService")
const serviceService = new ServiceService()
const dateUtil = require("../../utils/dateUtil")
const ObjectID = require("bson-objectid");
class MaintenanceService{

    constructor(){}

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async addNewDetailMaintenanceService(req) {
        let resp = await Maintenance.findById(req.params.id)
        if(resp == null) {
            throw new Error("This maintenance doesn't exist")
        }
        return await this._addNewDetailMaintenance(req, resp)
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async setDateheureFinReelleDetailMaintenance(req) {
        let maintenance = await Maintenance.findById(req.params.id)
        if(maintenance == null) {
            throw new Error("This maintenance doesn't exist")
        }
        return await this._findAndUpdateDetailMaintenance(req, maintenance)
    }

    /**
     *
     * @param {Request} req
     * @param maintenance
     * @returns {Promise<*>}
     * @private
     */
    async _findAndUpdateDetailMaintenance(req, maintenance) {
        // Trouver l'index
        const index = maintenance['detailMaintenances'].findIndex((val) => {
            if (val["_id"].toString() === req.params["detail_maintenance"]) {
                return val
            }
        })
        if (index === -1 ) {
            throw new Error("This detail maintenance doesn't exist")
        }
        maintenance['detailMaintenances'][index]["dateheure_fin_reelle"] = req.body["dateheure_fin_reelle"]
        //
        maintenance["dateheure_fin_reelle"] = this._getDateHeureFinReelMaintenanceFromDetailMaintenances(maintenance["detailMaintenances"])
        await Maintenance.updateOne({ "_id": req.params.id} , {"detailMaintenances": maintenance["detailMaintenances"], "dateheure_fin_reelle": maintenance["dateheure_fin_reelle"]});
        return maintenance
    }

    /**
     *
     * @param {Request} req
     * @param {*} response
     * @returns {Promise<*>}
     * @private
     */
    async _addNewDetailMaintenance(req, response) {
        await this._calculDateHeureDetailMaintenances(req)
        response["detailMaintenances"] = response["detailMaintenances"].concat(req.body['detailMaintenances'])
        response["dateheure_fin"] = this._getDateHeureFinMaintenanceFromDetailMaintenances(response['detailMaintenances'])
        const maintenance_id = req.params.id
        await Maintenance.updateOne({_id: maintenance_id}, {detailMaintenances: response["detailMaintenances"], dateheure_fin: response["dateheure_fin"]})
        return response;
    }

    /**
     *
     * @param {Array<*>} detailMaintenances
     * @returns {Date}
     * @private
     */
    _getDateHeureFinMaintenanceFromDetailMaintenances(detailMaintenances) {
        if(detailMaintenances.length === 0)
            return null
        return new Date(Math.max(...detailMaintenances.map(obj => obj['dateheure_fin'].getTime())));
    }

    /**
     *
     * @param {Array<*>} detailMaintenances
     * @returns {Date}
     * @private
     */
    _getDateHeureFinReelMaintenanceFromDetailMaintenances(detailMaintenances) {
        if(detailMaintenances.length === 0)
            return null
        return new Date(Math.max(...detailMaintenances.map(obj => obj['dateheure_fin_reelle'].getTime())));
    }



    /**
     *
     * @param detailMaintenance
     * @returns {Promise<*>}
     * @private
     */
    async _calculDateHeureDetailMaintenance(detailMaintenance) {
        const service = await serviceService.findByIdService(detailMaintenance['service'])
        if (service == null)
            throw new Error("Service not found")
        detailMaintenance['dateheure_debut'] = new Date(Date.now());
        detailMaintenance['dateheure_fin'] = dateUtil.addDays(detailMaintenance['dateheure_debut'], service['duree_estimee'])
        return detailMaintenance
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*[]>}
     * @private
     */
    async _calculDateHeureDetailMaintenances(req) {
        let newDetailMaintenance = [];
        const detailMaintenances = req.body['detailMaintenances']
        for(let i = 0; i < detailMaintenances.length; i++) {
            newDetailMaintenance.push(await this._calculDateHeureDetailMaintenance(detailMaintenances[i]))
        }
        req.body['detailMaintenances'] = newDetailMaintenance
    }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async deleteService(req) {
        return Maintenance.findByIdAndDelete(req.params.id);
   }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async findByIdService(req) {
        return Maintenance.findById(req.params.id)
            .populate("station")
            .populate({
                path: "detailMaintenances",
                populate: {
                    path: "services",
                    model: "Services",
                }
            });
    }


}
module.exports=MaintenanceService;
