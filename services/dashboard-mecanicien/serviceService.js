const Service = require('../../models/dashboard-mecanicien/Service');
const DemandeRDVDiagnostic = require("../../models/dashboard-client/DemandeRDVDiagnostic");
const {formatCreatedAndUpdatedDateForList} = require("../../utils/listUtil");

class ServiceService {

    constructor() {
    }

    async count() {
        return Service.aggregate([
            {
                $count: "count"
            }
        ])
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async findAllPaginate(req){
        const index=Number(req.params.index);
        const pageLimit=Number(req.params.pagelimit);
        const resp = await Service.find()
            .skip((index-1)*pageLimit)
            .limit(pageLimit)
            .lean();
        return formatCreatedAndUpdatedDateForList(resp);
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
    async insertManyService(req) {
        await Service.insertMany(req.body);
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
