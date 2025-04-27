class RevenueController {

    /**
     *
     * @param {RevenueService} service
     */
    constructor(service) {
        this.service = service;
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async getRevenuePerDay(req, res) {
        try {
            const revenue = await this.service.getRevenuePerDayService(req);
            res.status(200).json(revenue);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async getRevenuePerMonth(req, res) {
        try {
            const revenue = await this.service.getRevenuePerMonthService(req);
            res.status(200).json(revenue);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     *
     * @param {Request} req
     * @param {Response} res
     */
    async getBeneficePerMonth(req, res) {
        try {
            const revenue = await this.service.getBeneficePerMonthService(req);
            res.status(200).json(revenue);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}
module.exports = RevenueController;
