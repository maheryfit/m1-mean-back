const Client = require('../../models/dashboard-client/Client');
const utils = require("../../utils/tokenUtil");
const dateUtil = require("../../utils/dateUtil");
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
       await this._checkIfHavePermission(req);
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
     * @returns {Promise<void>}
     */
   async _checkIfHavePermission(req) {
       await utils.checkIfHavePermission(req, Client, "utilisateur")
   }


   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
       await this._checkIfHavePermission(req)
       const client = await Client.findById(req.params.id)
           .populate("utilisateur")
           .populate("statut_client")
           .populate("abonnement")
           .lean();
       client["nb_jour_client"] = dateUtil.dateDiffInDays(client['date_inscription'], new Date(Date.now()));
       return client;
   }

}
module.exports = ClientService;
