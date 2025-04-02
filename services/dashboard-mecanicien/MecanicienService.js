const Maintenance=require("../../models/dashboard-mecanicien/Maintenance");
const Mecanicien = require("../../models/dashboard-mecanicien/Mecanicien")
const { ObjectId } = require('mongodb');

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
     * @param {Request<?>} request
     * @returns {void}
     */
    async registerManyService(request) {
        const data = request.body
        await Mecanicien.insertMany(data)
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
    async getKPIMecanicienService(req) {
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
        const year = Number.parseInt(req.params.year)
        const month = Number.parseInt(req.params.month)
        const FORMAT = 1000 * 60 // En minutes
        const result = await Maintenance.aggregate([
            {
                $unwind: "$detailMaintenances" // Flatten the array first
            },
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "$detailMaintenances.dateheure_debut" }, year] },
                            { $eq: [{ $month: "$detailMaintenances.dateheure_debut" }, month] },
                            { $in: [new ObjectId(id), "$detailMaintenances.mecaniciens"] }
                        ]
                    }
                }
            },
            {
                $project: {
                    duration: {
                        $divide: [
                            { $subtract: columns },
                                FORMAT
                        ]
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

    /**
     *
     * @param {Number} year
     * @param {Number} month
     * @return {Promise<[]>}
     */
    async getMecaniciensWorkByYearAndMonth(year, month) {
        const result = await Maintenance.aggregate([
            {
                $unwind: "$detailMaintenances" // Flatten the array first
            },
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "$detailMaintenances.dateheure_debut"}, year] },
                            { $eq: [{ $month: "$detailMaintenances.dateheure_debut"}, month] },
                        ]
                    }
                }
            },
            {
                $unwind: "$detailMaintenances.mecaniciens" // Flatten the mecaniciens array
            },
            {
                $group: {
                    _id: "$detailMaintenances.mecaniciens" // Group by mecanicien ID
                }
            },
            {
                $project: {
                    _id: 0, // Remove default MongoDB _id
                    mecaniciens: "$_id"
                }
            }
        ])
        const mecanicienList = result.map((mecanicien) => {
            return mecanicien.mecaniciens
        })
        const mecaniciens = await Mecanicien.aggregate([
            {
                $match: {
                    $expr: {
                        $in: ["$_id", mecanicienList]
                    }
                }
            }
        ]);
        return Mecanicien.populate(mecaniciens, { path: "role" });
    }
}

module.exports=MecanicienService;
