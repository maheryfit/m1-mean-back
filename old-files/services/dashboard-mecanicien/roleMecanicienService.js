const RoleMecanicien=require("../../models/dashboard-mecanicien/RoleMecanicien");

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
