class ServiceController {

    /**
     *
     * @param {ServiceService} service
     */
    constructor(service) {
        this.service = service;
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async getAllPaginate(req, res){
        try {
            const demandes=await this.service.findAllPaginate(req);
            res.status(200).json(demandes);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async count(req, res){
        try {
            const count=await this.service.count(req);
            res.status(200).json(count.length===0?0:count[0].count);
        } catch (error) {
            res.status(400).json({message:error.message});
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async create(req, res) {
        try {
            const newService = await this.service.createService(req);
            res.status(201).json(newService);
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
            const abonnement = await this.service.updateService(req);
            res.status(200).json(abonnement);
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
            const abonnements = await this.service.getAllService();
            res.status(200).json(abonnements);
        } catch (error) {
            res.status(400).json({ message: error.message });
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
     */
    async findById(req, res) {
        try {
            const abonnement = await this.service.findByIdService(req.params.id);
            res.status(200).json(abonnement);
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

}

module.exports = ServiceController;
