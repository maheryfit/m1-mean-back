const Maintenance=require("../../models/dashboard-mecanicien/Maintenance");

class MecanicienService{
    async horaireTravail(id){
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
        return result[0]?.totalDuration || 0;
    }
}

module.exports=MecanicienService;