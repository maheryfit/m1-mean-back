class ConfirmationPaiementDevisController {

    /**
     *
     * @param {ConfirmationPaiementDevisService} service
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
            const newConfirmationPaiementDevis = await this.service.createService(req);
            res.status(201).json(newConfirmationPaiementDevis);
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
            const abonnement = await this.service.findByIdService(req);
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
    async findAll(req, res) {
        try {
            const abonnement = await this.service.findAllService();
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

module.exports = ConfirmationPaiementDevisController;
