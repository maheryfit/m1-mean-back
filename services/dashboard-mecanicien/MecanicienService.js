const Maintenance=require("../../models/dashboard-mecanicien/Maintenance");
const Mecanicien = require("../../models/dashboard-mecanicien/Mecanicien")
class MecanicienService{
    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newMecanicien = new Mecanicien(req.body);
        await newMecanicien.save();
        return newMecanicien;
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async updateService(req) {
        return Mecanicien.findByIdAndUpdate(req.params.id,
            req.body, {new: true});
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async deleteService(req) {
        return Mecanicien.findByIdAndDelete(req.params.id);
    }

    /**
     *
     * @returns {Promise<*>}
     */
    async getAllService() {
        return Mecanicien.find({})
            .populate("utilisateur")
            .populate("role")
            .populate("niveau");
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async findByIdService(req) {
        return Mecanicien.findById(req.params.id)
            .populate("utilisateur")
            .populate("role")
            .populate("niveau");
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<number>}
     */
    async horaireTravail(req){
        return await this._horaireTravailDynamic(req, ["$detailMaintenances.dateheure_fin", "$detailMaintenances.dateheure_debut"])
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<number>}
     */
    async horaireTravailReel(req){
        return await this._horaireTravailDynamic(req, ["$detailMaintenances.dateheure_fin_reelle", "$detailMaintenances.dateheure_debut"])
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<number>}
     */
    async getKPIMecanicien(req) {
        const horaire = await this.horaireTravail(req)
        const horaireReel = await this.horaireTravailReel(req)
        return (horaireReel * 100) / horaire
    }

    /**
     *
     * @param {Request} req
     * @param {Array<string>} columns
     * @returns {Promise<number|number>}
     * @private
     */
    async _horaireTravailDynamic(req, columns) {
        const id = req.params.id
        const year = req.params.year
        const month = req.params.month
        const result = await Maintenance.aggregate([
            {
                $match: {
                    "detailMaintenances.mecaniciens": id
                }
            },
            {
                $unwind: "$detailMaintenances"
            },
            {
                $match: {
                    "detailMaintenances.mecaniciens": id
                }
            },
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "$detailMaintenances.dateheure_debut" }, year] },
                            { $eq: [{ $month: "$detailMaintenances.dateheure_debut" }, month] }
                        ]
                    }
                }
            },
            {
                $project: {
                    duration: {
                        $subtract: columns
                    }
                }
            },
            {
                $group: {
                    _id: null, // Group everything together
                    totalDuration: { $sum: "$duration" }
                }
            }
        ]);
        return Number.parseFloat(result[0]?.totalDuration) || 0;
    }
}

module.exports=MecanicienService;