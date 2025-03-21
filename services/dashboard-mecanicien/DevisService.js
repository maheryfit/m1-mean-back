const Devis = require("../../models/dashboard-mecanicien/Devis");

class DevisService{
    /**
     * 
     * @param {Request} req 
     */
    async creerDevis(req){
        const devis=new Devis(req.body);
        await devis.save();
        return devis;
    }
}

module.exports=DevisService;