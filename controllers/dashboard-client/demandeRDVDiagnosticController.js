const DemandeRDVDiagnosticService = require("../../services/dashboard-client/demandeRDVDiagnosticService");

class DemandeRDVDiagnosticController {

    /**
     * 
     * @param {DemandeRDVDiagnosticService} service 
     */
    constructor(service) {
        this.service = service;
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async create(req, res) {
        try {
            const newDemandeRDVDiagnostic = await this.service.createService(req);
            res.status(201).json(newDemandeRDVDiagnostic);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async createMany(req, res) {
        try {
            await this.service.createManyService(req);
            res.status(201).json({message: "Successfully inserted"});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async update(req, res) {
        try {
            const demandeRDVDiagnostic = await this.service.updateService(req);
            res.status(200).json(demandeRDVDiagnostic);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async getAll(req, res) {
        try {
            const demandeRDVDiagnostics = await this.service.getAllService();
            res.status(200).json(demandeRDVDiagnostics);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async findById(req, res) {
        try {
            const demandeRDVDiagnostic = await this.service.findByIdService(req);
            res.status(200).json(demandeRDVDiagnostic);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async delete(req, res) {
        try {
            await this.service.deleteService(req);
            res.status(204).json({message: 'deleted'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async demandesRdvEnCours(req, res){
        try {
            const demandesRdvEnCours=await this.service.demandesRdvEnCours();
            res.status(200).json(demandesRdvEnCours);
        } catch (error) {
            res.status(500).json({ message : error.message });
        }
    }
    
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async actionDemandeRdv(req, res){
        try {
            await this.service.actionDemandeRdv(req);
            res.status(204).json({message: 'mis à jour'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

}

module.exports = DemandeRDVDiagnosticController;

