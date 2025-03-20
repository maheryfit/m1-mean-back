class VoitureController {

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
            const newVoiture = await this.service.createService(req);
            res.status(201).json(newVoiture);
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
            const voiture = await this.service.updateService(req);
            res.status(200).json(voiture);
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
            const voitures = await this.service.getAllService();
            res.status(200).json(voitures);
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
            const voiture = await this.service.findByIdService(req);
            res.status(200).json(voiture);
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

module.exports = VoitureController;

