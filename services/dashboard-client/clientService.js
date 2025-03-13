const Client = require('../../models/dashboard-client/Client');

class ClientService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newClient = new Client(req.body);
        await newClient.save();
        return newClient;
    }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async updateService(req) {
        return Client.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async deleteService(req) {
       return Client.findByIdAndDelete(req.params.id);
   }

   /**
     *
     * @returns {Promise<*>}
     */
   async getAllService() {
       return Client.find({});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
       return Client.findById(req.params.id);
   }

}
module.exports = ClientService;
