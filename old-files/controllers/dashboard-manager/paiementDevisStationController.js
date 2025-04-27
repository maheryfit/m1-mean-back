class PaiementDevisStationController {

    /**
     *
     * @param {PaiementDevisStationService} service
     */
    constructor(service) {
        this.service = service;
    }

   /**
     *
     * @param {Request} req
     * @param {Response} res
     */
   async getAll(req, res) {
       try {
           const paiementDevisStations = await this.service.getAllService();
           res.status(200).json(paiementDevisStations);
       } catch (error) {
           res.status(400).json({ message: error.message });
       }
   }

}
module.exports = PaiementDevisStationController;
