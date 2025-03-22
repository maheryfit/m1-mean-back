const DetailsMaintenance = require("../../models/dashboard-mecanicien/DetailsMaintenance");

class MaintenanceService{
    /**
     * 
     * @param {Request} req 
     */
    async ajouterDetailMaintenance(req){
        const idMaintenance=req.params.idmaintenance;
        const detail=new DetailsMaintenance(req.body);
        detail.maintenance={
            $oid: idMaintenance
        };
        await detail.save();
        return detail;
    }
}
module.exports=MaintenanceService;