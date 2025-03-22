const Devis = require("../../models/dashboard-mecanicien/Devis");
const Maintenance = require("../../models/dashboard-mecanicien/Maintenance");

class DevisService{
    /**
     * 
     * @param {Request} req 
     */
    async creerDevis(req){
        const devis=new Devis(req.body);
        await devis.save();
        const maintenance=new Maintenance({
            voiture:devis.voiture,
            dateheure_debut:devis.dateheure_debut_maintenance,
            station:devis.station,
            devis:devis._id
        });
        await maintenance.save();
        return {
            devis: devis,
            maintenance: maintenance
        };
    }
}

module.exports=DevisService;