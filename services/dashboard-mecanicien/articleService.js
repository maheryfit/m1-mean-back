const Article=require("../../models/dashboard-mecanicien/Article");
const RoleMecanicien = require("../../models/dashboard-mecanicien/RoleMecanicien");
const {formatCreatedAndUpdatedDateForList} = require("../../utils/listUtil");

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
    async insertManyService(req) {
        await Article.insertMany(req.body);
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

    async count() {
        return Article.aggregate([
            {
                $count: "count"
            }
        ])
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async findAllPaginate(req){
        const index=Number(req.params.index);
        const pageLimit=Number(req.params.pagelimit);
        const resp = await Article.find()
            .skip((index-1)*pageLimit)
            .limit(pageLimit)
            .populate("marque")
            .lean();
        return formatCreatedAndUpdatedDateForList(resp);
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
