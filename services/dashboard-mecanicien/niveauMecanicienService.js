const NiveauMecanicien=require("../../models/dashboard-mecanicien/NiveauMecanicien");
const {formatCreatedAndUpdatedDateForList} = require("../../utils/listUtil");

class NiveauMecanicienService{
    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newNiveauMecanicien = new NiveauMecanicien(req.body);
        await newNiveauMecanicien.save();
        return newNiveauMecanicien;
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async updateService(req) {
        return NiveauMecanicien.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async deleteService(req) {
        return NiveauMecanicien.findByIdAndDelete(req.params.id);
    }

    /**
    *
    * @returns {Promise<*>}
    */
    async getAllService() {
        return NiveauMecanicien.find({});
    }

    async count() {
        return NiveauMecanicien.aggregate([
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
        const resp = await NiveauMecanicien.find()
            .skip((index-1)*pageLimit)
            .limit(pageLimit)
            .lean();
        return formatCreatedAndUpdatedDateForList(resp);
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async findByIdService(req) {
        return NiveauMecanicien.findById(req.params.id);
    }
}
module.exports=NiveauMecanicienService;
