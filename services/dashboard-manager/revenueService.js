const PaiementDevis = require("../../models/dashboard-client/PaiementDevis");
const {getAllDaysOfMonth, getAllMonths} = require("../../utils/dateUtil");
const etatConfig = require("../../config/etats")
const MecancienService = require("../../services/dashboard-mecanicien/MecanicienService");
const mecancienService = new MecancienService();
class RevenueService {
    constructor() {
    }


    /**
     *
     * @param {Request} req
     * @returns {Promise<{}>}
     */
    async getBeneficePerMonthService(req) {
        const year = Number.parseFloat(req.params.year);
        const etat = etatConfig.ETAT_PAIEMENT_DEVIS[2];
        const paiementDevis = await this._getPaiementDevisPerMonth(year, etat);
        for (let date in paiementDevis) {
            const yearMonth = date.split("-")
            const sumSalary = await this._getSumSalary(Number.parseInt(yearMonth[0]), Number.parseInt(yearMonth[1]));
            paiementDevis[date] = Math.max(0, paiementDevis[date] - sumSalary);
        }
        return paiementDevis;
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<{}>}
     */
    async getRevenuePerMonthService(req) {
        const year = Number.parseFloat(req.params.year);
        const etat = etatConfig.ETAT_PAIEMENT_DEVIS[2];
        return await this._getPaiementDevisPerMonth(year, etat);
    }

    /**
     *
     * @param {Number} year
     * @param {Number} month
     * @returns {Promise<number>}
     * @private
     */
    async _getSumSalary(year, month) {
        const mecaniciens = await mecancienService.getMecaniciensWorkByYearAndMonth(year, month);
        let sum = 0;
        for(let i=0; i<mecaniciens.length; i++){
            sum += Number.parseFloat(mecaniciens[i].role.salaire_mensuel)
        }
        return sum
    }

    async _getPaiementDevisPerMonth(year, etat) {
        const months = getAllMonths(year)
        const paiementDevis = await PaiementDevis.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "$date_heure_validation" }, year] },
                            { $eq: ["$etat", etat] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m", // Year and month only
                            date: "$date_heure_validation"
                        }
                    },
                    totalMontant: { $sum: "$montant" },
                }
            }
        ])
        let toReturn = {}
        let value = 0
        let date
        for (let j = 0; j < months.length; j++) {
            value = 0
            date = months[j].date
            for (let i = 0; i < paiementDevis.length; i++) {
                if (paiementDevis[i]._id === date) {
                    value = Number.parseFloat(paiementDevis[i].totalMontant)
                    break
                }
            }
            toReturn[date] = value
        }
        return toReturn
    }


    /**
     *
     * @param {Request} req
     * @returns {Promise<{}>}
     */
    async getRevenuePerDayService(req) {
        const year = Number.parseInt(req.params.year);
        const month = Number.parseInt(req.params.month);
        const etat = etatConfig.ETAT_PAIEMENT_DEVIS[2];
        return await this._getPaiementDevisPerDay(year, month, etat);
    }

    /**
     *
     * @param {Number} year
     * @param {Number} month
     * @param {string} etat
     * @returns {Promise<{}>}
     * @private
     */
    async _getPaiementDevisPerDay(year, month, etat) {
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
        let value = 0
        let toReturn = {}
        let date
        for (let j = 0; j < daysInMonth.length; j++) {
            value = 0
            date = daysInMonth[j].date
            for (let i = 0; i < paiementDevis.length; i++) {
                if (paiementDevis[i].date === date) {
                    value = Number.parseFloat(paiementDevis[i].montant)
                    break
                }
            }
            toReturn[date] = value
        }
        return toReturn
    }
}
module.exports = RevenueService
