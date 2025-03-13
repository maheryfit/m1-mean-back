class VoitureController {

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
            const newVoiture = await this.service.createService(req);
            return res.status(201).json(newVoiture);
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
            const voiture = await this.service.updateService(req);
            return res.status(200).json(voiture);
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
            const voitures = await this.service.getAllService();
            return res.status(200).json(voitures);
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
            const voiture = await this.service.findByIdService(req);
            return res.status(200).json(voiture);
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
            return res.status(204);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}

module.exports = VoitureController;

