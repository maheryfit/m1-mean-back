const Maintenance = require("../../models/dashboard-mecanicien/Maintenance");
const ServiceService = require("./serviceService")
const serviceService = new ServiceService()
const dateUtil = require("../../utils/dateUtil")
class MaintenanceService{

    constructor(){}

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        req.body["detailMaintenances"] = await this._calculDateHeureDetailMaintenances(req)
        req.body["dateheure_fin"] = this._getDateHeureFinMaintenanceFromDetailMaintenances(req.body['detailMaintenances'])
        const newMaintenance = new Maintenance(req.body)
        await newMaintenance.save()
        return newMaintenance
    }

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
     * @param {*} response
     * @returns {Promise<*>}
     * @private
     */
    async _addNewDetailMaintenance(req, response) {
        req.body["detailMaintenances"] = await this._calculDateHeureDetailMaintenances(req)
        response["detailMaintenances"].concat(req.body['detailMaintenances'])
        response["dateheure_fin"] = this._getDateHeureFinMaintenanceFromDetailMaintenances(response['detailMaintenances'])
        const maintenance_id = req.params.id
        await Maintenance.updateOne({id: maintenance_id}, {detailMaintenances: response["detailMaintenances"], dateheure_fin: response["dateheure_fin"]})
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
     * @param detailMaintenance
     * @returns {Promise<*>}
     * @private
     */
    async _calculDateHeureDetailMaintenance(detailMaintenance) {
        const service = await serviceService.findByIdService(detailMaintenance['service'])
        if (service == null)
            throw new Error("Service not found")
        detailMaintenance['dateheure_debut'] = new Date(detailMaintenance['dateheure_debut']);
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
            newDetailMaintenance.push(this._calculDateHeureDetailMaintenance(detailMaintenances[i]))
        }
        return newDetailMaintenance
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
            .populate("voiture")
            .populate("station")
            .populate({
                path: "detailMaintenances",
                populate: {
                    path: "service",
                    model: "Services",
                }
            });
    }


}
module.exports=MaintenanceService;
