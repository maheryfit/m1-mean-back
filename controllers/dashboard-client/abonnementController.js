class AbonnementController {

    constructor(service) {
        this.service = service;
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<*>}
     */
    async create(req, res) {
        try {
            const newAbonnement = await this.service.createService(req);
            return res.status(201).json(newAbonnement);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<*>}
     */
    async update(req, res) {
        try {
            const abonnement = await this.service.updateService(req);
            return res.status(200).json(abonnement);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<*>}
     */
    async getAll(req, res) {
        try {
            const abonnements = await this.service.getAllService();
            return res.status(200).json(abonnements);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<*>}
     */
    async findById(req, res) {
        try {
            const abonnement = await this.service.findByIdService(req);
            return res.status(200).json(abonnement);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @returns {Promise<*>}
     */
    async delete(req, res) {
        try {
            await this.service.deleteService(req);
            return res.status(204).json({message: 'deleted'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}

module.exports = AbonnementController;
