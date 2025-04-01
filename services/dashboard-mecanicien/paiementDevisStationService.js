const PaiementDevisStation = require("../../models/dashboard-mecanicien/PaiementDevisStation");
const PaiementDevis = require("../../models/dashboard-client/PaiementDevis");

class PaiementDevisStationService {
    constructor() {
    }

     /**
     *
     * @param {Request} req
     * @returns {Promise<void>}
     */
    async createService(req) {
        const station = await this._getStation(req)
        let paiementDevisStation = await this._findByStation(req)
        if (!paiementDevisStation) {
           paiementDevisStation = await this._createStation(req, station)
        } else {
            paiementDevisStation = await this._addNewPaiementForStation(req, paiementDevisStation)
        }
        return paiementDevisStation;
    }


    /**
     *
     * @param {Request} req
     * @returns {Promise<void>}
     * @private
     */
    async _findByStation(req) {
        return PaiementDevisStation.findOne({
            station: req.body.station
        })
    }

        /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     * @private
     */
    async _getPaiementDevis(req) {
        const paiementDevis = await PaiementDevis.findOne({
            _id: req.body['paiementDevis']
        })
        if (!paiementDevis) {
            throw new Error("No paiement devis found");
        }
        return paiementDevis;
    }


    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     * @private
     */
    async _getStation(req) {
        const paiementDevis = await PaiementDevis.findOne({ _id: req.body['paiementDevis']}).populate("devis")
        if (!paiementDevis) {
            throw new Error("No paiement devis found");
        }
        return paiementDevis.devis.station;
    }

    /**
     *
     * @param {Request} req
     * @param {*} response
     * @returns {Promise<*>}
     * @private
     */
    async _addNewPaiementForStation(req, response) {
        const paiementDevis = await this._getPaiementDevis(req)
        response["paiements"].push({ date_heure: Date.now(), montant: paiementDevis.montant })
        await PaiementDevisStation.updateOne({ id: response._id }, response)
        return response;
    }


    /**
     * @param {string} stationId
     * @param {Request} req
     * @returns {Promise<void>}
     * @private
     */
    async _createStation(req, stationId) {
        const paiementDevis = await this._getPaiementDevis(req)
        const bodyPaiementDevisStation = {
            "station": stationId,
            "paiements": [
                { date_heure: Date.now(), montant: paiementDevis.montant }
            ]
        }
        const paiementDevisStation = new PaiementDevisStation(bodyPaiementDevisStation);
        await paiementDevisStation.save();
        return paiementDevisStation;
    }
}
module.exports = PaiementDevisStationService;
