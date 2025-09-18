class VoitureController {

    /**
     *
     * @param {VoitureService} service
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
            const voitures = await this.service.getAllService(req);
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
    async getAllPaginate(req, res) {
        try {
            const voitures = await this.service.getAllServicePaginate(req);
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
            if(!voiture){
                return res.status(404).json({message: "Voiture introuvable"});
            }
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

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    async count(req, res){
        try {
            const count=await this.service.count(req);
            res.status(200).json(count.length==0?0:count[0].count);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

}

module.exports = VoitureController;

