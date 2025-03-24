const Devis = require("../../models/dashboard-mecanicien/Devis");
class DevisService{
    constructor(){}

    /**
     * 
     * @param {Request} req 
     */
    async createService(req){
        const devis=new Devis(req.body);
        await devis.save();
        return devis;
    }

    /**
     *
     * @param {Request} req
     */
    async updateService(req){
        const devis=new Devis(req.body);
        await devis.save();
        return devis;
    }
}

module.exports=DevisService;
