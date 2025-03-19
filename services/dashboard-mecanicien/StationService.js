const Station=require("../../models/dashboard-mecanicien/Stations");

class StationService{
    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newStation = new Station(req.body);
        await newStation.save();
        return newStation;
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async updateService(req) {
        return Station.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async deleteService(req) {
        return Station.findByIdAndDelete(req.params.id);
    }

    /**
    *
    * @returns {Promise<*>}
    */
    async getAllService() {
        return Station.find({});
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async findByIdService(req) {
        return Station.findById(req.params.id);
    }
}
module.exports=StationService;