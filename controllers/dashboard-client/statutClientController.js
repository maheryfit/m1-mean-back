class StatutClientController {

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
            const newStatutClient = await this.service.createService(req);
            res.status(201).json(newStatutClient);
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
            const statutClient = await this.service.updateService(req);
            res.status(200).json(statutClient);
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
            const statutClients = await this.service.getAllService();
            res.status(200).json(statutClients);
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
            const statutClient = await this.service.findByIdService(req);
            res.status(200).json(statutClient);
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
    async modifyStatusClientByClient(req, res) {
        try {
            await this.service.modifyStatusClientByClientService(req);
            res.status(200).json({message: 'Client status changed'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}
module.exports = StatutClientController;
