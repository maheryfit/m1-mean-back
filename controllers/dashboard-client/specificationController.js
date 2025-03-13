class SpecificationController {

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
            const newSpecification = await this.service.createService(req);
            res.status(201).json(newSpecification);
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
            const specification = await this.service.updateService(req);
            res.status(200).json(specification);
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
            const specifications = await this.service.getAllService();
            res.status(200).json(specifications);
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
            const specification = await this.service.findByIdService(req);
            res.status(200).json(specification);
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
            res.status(204).json({message: 'deleted'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}
module.exports = SpecificationController;
