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
    async create(req, res){
        try {
            const devis=await this.service.createService(req);
            res.status(201).json(devis);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async annuler(req, res) {
        try {
            const devis=await this.service.annulerService(req);
            res.status(200).json(devis);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async getDevisCreer(req, res) {
        try {
            const devis=await this.service.getDevisCreer(req);
            res.status(200).json(devis);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async getDevisAnnuler(req, res) {
        try {
            const devis=await this.service.getDevisAnnuler(req);
            res.status(200).json(devis);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<void>}
     */
    async getDevisPayer(req, res) {
        try {
            const devis=await this.service.getDevisPayer(req);
            res.status(200).json(devis);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async update(req, res){
        try {
            const devis=await this.service.updateService(req);
            res.status(200).json(devis);
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
            res.status(204).json({message: "Deleted successfully"});
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
            const devis = await this.service.findByIdService(req);
            res.status(200).json(devis);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async findByIdDemande(req, res){
        try {
            const devis = await this.service.findByIdDemande(req);
            res.status(200).json(devis[0]);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async getAllServiceByStation(req, res){
        try {
            const devis = await this.service.getAllServiceByStation(req);
            res.status(200).json(devis);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}
module.exports=DevisController;
