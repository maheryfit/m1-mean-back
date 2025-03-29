const Maintenance=require("../../models/dashboard-mecanicien/Maintenance");

class MecanicienService{
    /**
     *
     * @param {string} req
     * @returns {Promise<number>}
     */
    async horaireTravail(req){
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
                        $subtract: ["$detailMaintenances.dateheure_fin", "$detailMaintenances.dateheure_debut"]
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