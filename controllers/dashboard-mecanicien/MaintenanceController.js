const MaintenanceService = require("../../services/dashboard-mecanicien/MaintenanceService");

class MaintenanceController{
    /**
     * 
     * @param {MaintenanceService} service 
     */
    constructor(service){
        this.service=service;
    }
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async ajouterDetailMaintenance(req, res){
        try {
            const detail=await this.service.ajouterDetailMaintenance(req);
            res.status(200).json(detail);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports=MaintenanceController;