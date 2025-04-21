class ArticleController {
    /**
     *
     * @param {ArticleService} service
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
            const newArticle = await this.service.createService(req);
            res.status(201).json(newArticle);
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
            const article = await this.service.updateService(req);
            res.status(200).json(article);
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
            const articles = await this.service.getAllService();
            res.status(200).json(articles);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async insertMany(req, res) {
        try {
            await this.service.insertManyService(req);
            res.status(201).json({message: 'Inserted'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async getAllPaginate(req, res){
        try {
            const articles=await this.service.findAllPaginate(req);
            res.status(200).json(articles);
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
    async findById(req, res) {
        try {
            const article = await this.service.findByIdService(req);
            res.status(200).json(article);
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

module.exports = ArticleController;
