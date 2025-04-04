const DemandeRDVDiagnosticService = require("../../services/dashboard-client/demandeRDVDiagnosticService");
const DiagnosticService = require("../../services/dashboard-mecanicien/diagnosticService");

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

    async findByIdMecanicien(req, res) {
        try {
            const demandeRDVDiagnostic = await this.service.findByIdServiceMecanicien(req);
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
            const demandesRdvEnCours=await this.service.demandesRdvEnCours(req);
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
    async demandesRdvRejeter(req, res) {
        try {
            const demandesRdvEnCours = await this.service.demandesRdvRejeter(req);
            res.status(200).json(demandesRdvEnCours);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async demandesRdvAccepter(req, res) {
        try {
            const demandesRdvEnCours = await this.service.demandesRdvAccepter(req);
            res.status(200).json(demandesRdvEnCours);
        } catch (error) {
            res.status(500).json({message: error.message});
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
    
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async ajoutDiagnostic(req, res){
        try {
            const diagnostic=await this.service.ajoutDiagnostic(req);
            const diagService=new DiagnosticService();
            const diagDetails=await diagService.findByIdServiceNoRequest(diagnostic._id);
            res.status(204).json(diagDetails);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async getAllPaginate(req, res){
        try {
            const demandes=await this.service._demandeRdvDynamicPaginate(req);
            res.status(200).json(demandes);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    async count(req, res){
        try {
            const count=await this.service.count(req);
            res.status(200).json(count.length==0?0:count[0].count);
        } catch (error) {
            res.status(400).json({message:error.message});
        }
    }

}

module.exports = DemandeRDVDiagnosticController;

