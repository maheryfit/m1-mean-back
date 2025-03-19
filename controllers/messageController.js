class MessageController {

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
            const newMessage = await this.service.createService(req);
            res.status(201).json(newMessage);
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
            const newMessage = await this.service.findByIdService(req);
            res.status(201).json(newMessage);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = MessageController;
