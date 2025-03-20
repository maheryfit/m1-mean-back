const ChangementStatutClient=require("../../models/dashboard-manager/ChangementStatutClient");
const {startSession} = require("mongoose");
const Client = require("../../models/dashboard-client/Client");
const tokenUtil = require("../../utils/tokenUtil");
const Manager = require("../../models/dashboard-manager/Manager");
class ChangementStatutClientService{

    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        const manager = await tokenUtil.getRealProfileUserFromRequestParam(req, Manager)
        req.body['manager'] = manager.id
        const newChangementStatutClient = new ChangementStatutClient(req.body);
        const session = await startSession();
        session.startTransaction()
        try {
            await newChangementStatutClient.save();
            await this._modifyStatutClient(newChangementStatutClient);
            await session.commitTransaction()
            return newChangementStatutClient;
        } catch (error) {
            await session.abortTransaction()
            throw error;
        } finally {
            await session.endSession()
        }
    }

    /**
     *
     * @param newStatutClient
     * @returns {Promise<void>}
     * @private
     */
    async _modifyStatutClient(newStatutClient) {
        // Modification du changement du statut du client
        const client = await Client.findById(newStatutClient.client.toString());
        if (!client) {
            throw new Error('Client does not exist');
        }
        await Client.updateOne({ _id: client._id }, { statut_client: newStatutClient.statut_client.toString() });
    }

    /**
    *
    * @returns {Promise<*>}
    */
    async getAllService() {
        return ChangementStatutClient.find({})
            .populate("manager")
            .populate("statut_client")
            .populate("client")
            /*
            // populate a populate field (client -> utilisateur)
            .populate({
                path: "client",
                populate: {
                    path: "utilisateur",
                    model: "Utilisateurs",
                }
            });
             */
    }

}
module.exports=ChangementStatutClientService;
