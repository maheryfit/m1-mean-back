class ChangementStatutClientController {

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
            const newChangementStatutClient = await this.service.createService(req);
            res.status(201).json(newChangementStatutClient);
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
            const changementStatutClient = await this.service.getAllService();
            res.status(200).json(changementStatutClient);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


}
module.exports = ChangementStatutClientController;
