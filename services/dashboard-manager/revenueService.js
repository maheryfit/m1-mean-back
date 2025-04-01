const PaiementDevis = require("../../models/dashboard-client/PaiementDevis");
const {getAllDaysOfMonth} = require("../../utils/dateUtil");

class RevenueService {
    constructor() {
    }


    async getRevenuePerDay(req) {

    }

    async _getPaiementDevis(year, month, etat) {
        const daysInMonth = getAllDaysOfMonth(year, month);
        const paiementDevis = await PaiementDevis.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "$date_heure_validation" }, year] },
                            { $eq: [{ $month: "$date_heure_validation" }, month] },
                            { $eq: ["$etat", etat] }
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: 1, // Exclude _id (set to 1 if you want to keep it)
                    montant: 1,
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$date_heure_validation"
                        }
                    }
                }
            },
            {
                $sort: { date: 1 }
            }
        ])
    }


}
module.exports = RevenueService
