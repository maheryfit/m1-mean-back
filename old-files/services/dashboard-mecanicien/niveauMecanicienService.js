const NiveauMecanicien=require("../../models/dashboard-mecanicien/NiveauMecanicien");

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
