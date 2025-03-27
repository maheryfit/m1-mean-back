const Marque=require("../../models/dashboard-mecanicien/Marque");

class MarqueService{
    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newMarque = new Marque(req.body);
        await newMarque.save();
        return newMarque;
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async updateService(req) {
        return Marque.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async deleteService(req) {
        return Marque.findByIdAndDelete(req.params.id);
    }

    /**
    *
    * @returns {Promise<*>}
    */
    async getAllService() {
        return Marque.find({});
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async findByIdService(req) {
        return Marque.findById(req.params.id);
    }
}
module.exports=MarqueService;
