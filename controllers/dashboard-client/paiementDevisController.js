class PaiementDevisController {

    /**
     *
     * @param {PaiementDevisService} service
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
            const newPaiementDevis = await this.service.createService(req);
            res.status(201).json(newPaiementDevis);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async getPaiementEffectuer(req, res) {
        try {
            const abonnements = await this.service.getPaiementEffectuer(req);
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
    async getPaiementAnnuler(req, res) {
        try {
            const abonnements = await this.service.getPaiementAnnuler(req);
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
    async getPaiementValider(req, res) {
        try {
            const abonnements = await this.service.getPaiementValider(req);
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
    async delete(req, res) {
        try {
            await this.service.deleteService(req);
            res.status(204).json({message: 'deleted'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}

module.exports = PaiementDevisController;
