const Manager = require('../../models/dashboard-manager/Manager');
const utils = require("../../utils/tokenUtil");
class ManagerService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newManager = new Manager(req.body);
        await newManager.save();
        return newManager;
    }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async updateService(req) {
       await this._checkIfHavePermission(req);
       return Manager.findByIdAndUpdate(req.params.id,
           req.body, {new: true});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async deleteService(req) {
       await this._checkIfHavePermission(req);
       return Manager.findByIdAndDelete(req.params.id);
   }

   /**
     *
     * @returns {Promise<*>}
     */
   async getAllService() {
       return Manager.find({});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<void>}
     */
   async _checkIfHavePermission(req) {
       await utils.checkIfHavePermission(req, Manager, "utilisateur")
   }


   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
       await this._checkIfHavePermission(req)
       return Manager.findById(req.params.id)
           .populate("utilisateur");
   }

}
module.exports = ManagerService;
