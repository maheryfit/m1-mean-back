class MaintenanceController{
    /**
     * 
     * @param {MaintenanceService} maintenanceService
     * @param {DetailMaintenanceService} detailMaintenanceService
     */
    constructor(maintenanceService, detailMaintenanceService){
        this.maintenanceService=maintenanceService;
        this.detailMaintenanceService=detailMaintenanceService;
    }
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async create(req, res){
        try {
            const detail=await this.maintenanceService.createService(req);
            res.status(200).json(detail);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports=MaintenanceController;
