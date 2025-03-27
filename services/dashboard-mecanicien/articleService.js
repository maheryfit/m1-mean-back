const Article=require("../../models/dashboard-mecanicien/Article");

class ArticleService{
    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newArticle = new Article(req.body);
        await newArticle.save();
        return newArticle;
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async updateService(req) {
        return Article.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async deleteService(req) {
        return Article.findByIdAndDelete(req.params.id);
    }

    /**
    *
    * @returns {Promise<*>}
    */
    async getAllService() {
        return Article.find({})
            .populate("marque");
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async findByIdService(req) {
        return Article.findById(req.params.id)
         .populate("marque");
    }
}
module.exports=ArticleService;
