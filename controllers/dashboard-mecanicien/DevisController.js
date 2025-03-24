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
    async payer(req, res) {
        try {
            const devis=await this.service.payerService(req);
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
     */
    /*async update(req, res){
        try {
            const devis=await this.service.updateService(req);
            res.status(200).json(devis);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }*/
}
module.exports=DevisController;
