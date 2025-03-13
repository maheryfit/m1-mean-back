const PaiementAbonnement = require('../../models/dashboard-client/PaiementAbonnement');

class PaiementAbonnementService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newPaiementAbonnement = new PaiementAbonnement(req.body);
        await newPaiementAbonnement.save();
        return newPaiementAbonnement;
    }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async updateService(req) {
        return PaiementAbonnement.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async deleteService(req) {
       return PaiementAbonnement.findByIdAndDelete(req.params.id);
   }

   /**
    *
    * @returns {Promise<*>}
    */
   async getAllService() {
       return PaiementAbonnement.find({});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
       return PaiementAbonnement.findById(req.params.id);
   }

}
module.exports = PaiementAbonnementService;
