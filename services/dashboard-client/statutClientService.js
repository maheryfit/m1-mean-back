const StatutClient = require('../../models/dashboard-client/StatutClient');

class StatutClientService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newStatutClient = new StatutClient(req.body);
        await newStatutClient.save();
        return newStatutClient;
    }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async updateService(req) {
        return StatutClient.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async deleteService(req) {
       return StatutClient.findByIdAndDelete(req.params.id);
   }

   /**
     *
     * @returns {Promise<*>}
     */
   async getAllService() {
       return StatutClient.find({});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
       return StatutClient.findById(req.params.id);
   }

}
module.exports = StatutClientService;
