const Service = require('../../models/dashboard-mecanicien/Service');

class ServiceService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newService = new Service(req.body);
        await newService.save();
        return newService;
    }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async updateService(req) {
        return Service.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async deleteService(req) {
       return Service.findByIdAndDelete(req.params.id);
   }

   /**
    *
    * @returns {Promise<*>}
    */
   async getAllService() {
       return Service.find({});
   }


    /**
     *
     * @param {string} id
     * @returns {Promise<*>}
     */
    async findByIdService(id) {
        return Service.findById(id);
    }

}
module.exports = ServiceService;
