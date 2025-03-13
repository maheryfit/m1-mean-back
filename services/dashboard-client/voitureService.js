const Voiture = require('../../models/dashboard-client/Voiture');

class VoitureService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
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
        return Voiture.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async deleteService(req) {
       return Voiture.findByIdAndDelete(req.params.id);
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
