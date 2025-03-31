class DiagnosticController{
    /**
     * 
     * @param {DiagnosticService} service
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
            const diagnostics=await this.service.createService(req);
            res.status(201).json(diagnostics);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async insertMany(req, res) {
        try {
            await this.service.insertManyService(req);
            res.status(201).json({message: 'Inserted'});
        } catch (error) {
            res.status(400).json({ message: error.message });
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
            const diagnostics=await this.service.annulerService(req);
            res.status(200).json(diagnostics);
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
    async findAllAnnuler(req, res) {
        try {
            const diagnostics=await this.service.findAllAnnuler(req);
            res.status(200).json(diagnostics);
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
    async findAllEffectuer(req, res) {
        try {
            const diagnostics=await this.service.findAllEffectuer(req);
            res.status(200).json(diagnostics);
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
            const diagnostics=await this.service.updateService(req);
            res.status(200).json(diagnostics);
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
            const diagnostics = await this.service.findByIdService(req);
            res.status(200).json(diagnostics);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}
module.exports=DiagnosticController;
