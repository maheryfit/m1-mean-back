const PaiementDevis = require("../../models/dashboard-client/PaiementDevis");

class RevenueService {
    constructor() {
    }


    async getRevenuePerDay(req) {

    }

    async _getPaiementDevis(year, month, etat) {
        /*
           db["paiementdevis"].aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "$date_heure" }, 2025] },
                            { $eq: [{ $month: "$date_heure" }, 4] },
                        ]
                    }
                }
            }
        ])
         */
        const paiementDevis = await PaiementDevis.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "date_heure_validation" }, year] },
                            { $eq: [{ $month: "date_heure_validation" }, month] },
                            { $eq: ["$etat", etat] }
                        ]
                    }
                }
            }
        ])
    }
}
module.exports = RevenueService
