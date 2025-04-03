const Station=require("../../models/dashboard-mecanicien/Station");

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

    async getAllServicePaginate(index, pagelimit) {
        return Station.find({})
                .skip((index-1)*pagelimit)
                .limit(pagelimit);
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async findByIdService(req) {
        return Station.findById(req.params.id);
    }

    async count(){
        return Station.aggregate([{
            $count:"count"
        }]);
    }
}
module.exports=StationService;
