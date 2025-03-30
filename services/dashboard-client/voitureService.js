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
        await this._checkIfHavePermissionFromRequestBody(req)
        req.body["images_name"] = []
        req.files.forEach((file) => {
            req.body["images_name"].push(file["filename"]);
        })
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
       req.body["images_name"] = []
       req.files.forEach((file) => {
           req.body["images_name"].push(file["filename"]);
       })
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
     * @returns {Promise<*>}
     * @private
     */
    async _voitureDynamic(req) {
        const user = utils.getDataFromRequestToken(req)
        if(user.profil === "client") {
            return Voiture.find({ proprietaire: user.id })
                .populate("specification")
        }
        return Voiture.find({})
            .populate("specification")
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<void>}
     */
   async _checkIfHavePermissionFromRequestBody(req) {
       await utils.checkIfHavePermissionFromRequestBody(req, Utilisateur,"proprietaire")
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
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async getAllService(req) {
       return await this._voitureDynamic(req);
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
       return Voiture.findById(req.params.id).populate("specification");
   }

}
module.exports = VoitureService;
