const Voiture = require('../../models/dashboard-client/Voiture');
const utils = require('../../utils/tokenUtil');
const Utilisateur = require('../../models/Utilisateur');
class VoitureService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        await this._checkIfHavePermissionRequestBody(req)
        req.body["image_name"] = req.files[0]["filename"];
        const newVoiture = new Voiture(req.body);
        await newVoiture.save();
        return newVoiture;
    }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async updateService(req) {
       await this._checkIfHavePermission(req)
       return Voiture.findByIdAndUpdate(req.params.id,
           req.body, {new: true});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async deleteService(req) {
       await this._checkIfHavePermission(req)
       return Voiture.findByIdAndDelete(req.params.id);
   }

    /**
     *
     * @param {Request} req
     * @returns {Promise<void>}
     */
   async _checkIfHavePermissionRequestBody(req) {
       await utils.checkIfHavePermissionRequestBody(req, Voiture, Utilisateur,"proprietaire")
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<void>}
     */
   async _checkIfHavePermission(req) {
       await utils.checkIfHavePermission(req, Voiture, "proprietaire")
   }

   /**
     *
     * @returns {Promise<*>}
     */
   async getAllService() {
       return Voiture.find({});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
       return Voiture.findById(req.params.id);
   }

}
module.exports = VoitureService;
