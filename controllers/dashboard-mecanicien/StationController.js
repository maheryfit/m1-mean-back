class StationController {

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
            const newStation = await this.service.createService(req);
            res.status(201).json(newStation);
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

    async getAllPaginate(req, res) {
        try {
            const index=req.params.index;
            const pageLimit=req.params.pagelimit;
            const stations = await this.service.getAllServicePaginate(index, pageLimit);
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

    async count(req, res){
        try{
            const count=await this.service.count();
            res.status(200).json(count[0].count)
        }catch(error){
            res.status(400).json({ message: error.message });
        }
    }

}

module.exports = StationController;
