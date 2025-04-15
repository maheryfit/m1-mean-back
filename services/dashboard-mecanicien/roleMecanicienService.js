const RoleMecanicien=require("../../models/dashboard-mecanicien/RoleMecanicien");
const Service = require("../../models/dashboard-mecanicien/Service");
const {formatCreatedAndUpdatedDateForList} = require("../../utils/listUtil");

class RoleMecanicienService{
    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newRoleMecanicien = new RoleMecanicien(req.body);
        await newRoleMecanicien.save();
        return newRoleMecanicien;
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async updateService(req) {
        return RoleMecanicien.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async deleteService(req) {
        return RoleMecanicien.findByIdAndDelete(req.params.id);
    }

    /**
    *
    * @returns {Promise<*>}
    */
    async getAllService() {
        return RoleMecanicien.find({});
    }

    async count() {
        return RoleMecanicien.aggregate([
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
        const resp = await RoleMecanicien.find()
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
        return RoleMecanicien.findById(req.params.id);
    }
}
module.exports=RoleMecanicienService;
