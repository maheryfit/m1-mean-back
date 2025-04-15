class RoleMecanicienController {

    /**
     *
     * @param {RoleMecanicienService} service
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
            const mecaniciens=await this.service.findAllPaginate(req);
            res.status(200).json(mecaniciens);
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
            const newRoleMecanicien = await this.service.createService(req);
            res.status(201).json(newRoleMecanicien);
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
            const station = await this.service.updateService(req);
            res.status(200).json(station);
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
            const stations = await this.service.getAllService();
            res.status(200).json(stations);
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
            const station = await this.service.findByIdService(req);
            res.status(200).json(station);
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

module.exports = RoleMecanicienController;
