const DevisService=require("../../services/dashboard-mecanicien/DevisService")
class DevisController{
    /**
     * 
     * @param {DevisService} service 
     */
    constructor(service){
        this.service=service;
    }
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async creerDevis(req, res){
        try {
            const devis=await this.service.creerDevis(req);
            res.status(200).json(devis);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}
module.exports=DevisController;