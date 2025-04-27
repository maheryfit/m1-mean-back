const Client = require('../../models/dashboard-client/Client');
const tokenUtil = require("../../utils/tokenUtil");
const dateUtil = require("../../utils/dateUtil");
const etats = require("../../config/etats")
const PaiementDevis = require("../../models/dashboard-client/PaiementDevis");
class ClientService {

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const newClient = new Client(req.body);
        await newClient.save();
        return newClient;
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async updateService(req) {
       await this._checkIfHavePermission(req);
       return Client.findByIdAndUpdate(req.params.id,
           req.body, {new: true});
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async deleteService(req) {
       return Client.findByIdAndDelete(req.params.id);
    }

   /**
     *
     * @returns {Promise<*>}
     */
   async getAllService() {
       return Client.find({});
   }

   /**
     *
     * @param {Request} req
     * @returns {Promise<void>}
     */
   async _checkIfHavePermission(req) {
       await tokenUtil.checkIfHavePermission(req, Client, "utilisateur")
   }


   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
       await this._checkIfHavePermission(req)
       const client = await Client.findById(req.params.id)
           .populate("utilisateur")
           .populate("statut_client")
           .populate("abonnement")
           .lean();
       client["nb_jour_client"] = dateUtil.dateDiffInDays(client['date_inscription'], new Date(Date.now()));
       return client;
   }

    async getClientFromPaiementDevisByYearAndMonth(year, month) {
        const result = await PaiementDevis.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $year: "$date_heure_validation"}, year] },
                            { $eq: [{ $month: "$date_heure_validation"}, month] },
                            { $eq: ["$etat" , etats.ETAT_PAIEMENT_DEVIS[2]] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$client" // Group by client ID
                }
            },
            {
                $project: {
                    _id: 0, // Remove default MongoDB _id
                    clients: "$_id"
                }
            }
        ])
        const clientList = result.map((client) => {
            return client.clients
        })

        const clients = await Client.aggregate([
            {
                $match: {
                    $expr: {
                        $in: ["$_id", clientList]
                    }
                }
            }
        ]);
        return Client.populate(clients, { path: "abonnement"});
    }

}
module.exports = ClientService;
