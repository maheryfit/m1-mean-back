const StatutClient = require('../../models/dashboard-client/StatutClient');
const Client = require('../../models/dashboard-client/Client');
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

    /**
     *
     * @param {Request} req
     * @returns {Promise<Client>}
     */
   async modifyStatusClientByClientService(req){
       const statutClient = await StatutClient.findById(req.params.id);
       if (!statutClient) {
           throw new Error('Not Found');
       }
       const client = await Client.findById(req.params.client);
       if (!client) {
           throw new Error('Not Found');
       }
       return Client.updateOne({_id: client._id}, {statut_client: statutClient._id});
   }

}
module.exports = StatutClientService;
