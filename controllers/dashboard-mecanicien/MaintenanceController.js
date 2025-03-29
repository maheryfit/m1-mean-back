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
    async addNewDetailMaintenance(req, res){
        try {
            const detail=await this.service.addNewDetailMaintenanceService(req);
            res.status(201).json(detail);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async setDateheureFinReelleDetailMaintenance(req, res){
        try {
            const detail=await this.service.setDateheureFinReelleDetailMaintenance(req);
            res.status(200).json(detail);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async findById(req, res){
        try {
            const detail=await this.service.findByIdService(req);
            res.status(200).json(detail);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async delete(req, res){
        try {
            await this.service.deleteService(req);
            res.status(204).json({message: "Maintenance deleted"});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports=MaintenanceController;
