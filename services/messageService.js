const Message = require("../models/Message");
const utils = require("../utils/tokenUtil");
const Utilisateur = require("../models/Utilisateur");
const {compare} = require("bcrypt");

class MessageService {
    constructor() {
    }

    /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
    async createService(req) {
        await this._checkIfHavePermission(req)
        const utilisateur_1 = req.body["utilisateur_1"]
        const utilisateur_2 = req.body["utilisateur_2"]
        let resp = await this._getMessageFromUtilisateurs(utilisateur_1, utilisateur_2);
        if(resp == null) {
            resp = await this._createNewMessage(req)
        } else {
            resp = await this._addNewMessage(req, resp)
        }
        return resp['conversations'].sort(this.compareMessages)
    }

    compareMessages(a, b) {
        const aDate = new Date(a.date_heure_contenu === undefined ? Date.now() : a.date_heure_contenu);
        const bDate = new Date(b.date_heure_contenu === undefined ? Date.now() : b.date_heure_contenu);
        if(aDate > bDate) {
            return 0;
        }
        return -1;
    }

    /**
     *
     * @param {Request} req
     * @param {*} response
     * @returns {Promise<*>}
     * @private
     */
    async _addNewMessage(req, response) {
        this._checkIfDestinataireInUtilisateurs(req)
        req.body['conversations']['date_heure_contenu'] = new Date(Date.now())
        response["conversations"].push(req.body['conversations'])
        const utilisateur_1 = req.body["utilisateur_1"]
        const utilisateur_2 = req.body["utilisateur_2"]
        await Message.updateOne(this._getFilterObjectByUtilisateur(utilisateur_1, utilisateur_2), {conversations: response["conversations"]})
        return response;
    }


    /**
     *
     * @param req
     * @returns {Promise<void>}
     * @private
     */
    async _createNewMessage(req) {
        const conversation = req.body["conversations"]
        conversation['date_heure_contenu'] = new Date(Date.now())
        this._checkIfDestinataireInUtilisateurs(req)
        req.body["conversations"] = []
        req.body["conversations"].push(conversation)
        const newMessage = new Message(req.body)
        await newMessage.save()
        return newMessage
    }

    /**
     *
     * @param req
     * @private
     */
    _checkIfDestinataireInUtilisateurs(req) {
        const conversation = req.body["conversations"]
        const destinataire = conversation["destinataire"]
        // Vérifier si le destinataire soit utilisateur_1 ou utilisateur_2
        const utilisateurs = [req.body.utilisateur_1, req.body.utilisateur_2];
        if(!utilisateurs.includes(destinataire))
            throw new Error("Le destinataire est inconnu")
    }

    /**
     *
     * @param req
     * @returns {Promise<void>}
     * @private
     */
    async _checkIfHavePermission(req) {
        // Vérifier si l'utilisateur est l'utilisateur 1
        try {
            await utils.checkIfHavePermissionFromRequestBody(req, Utilisateur,"utilisateur_1")
        } catch (error) {
            // On attrape l'erreur et on n'en fait rien
            // Vérifier si l'utilisateur est l'utilisateur 2
            await utils.checkIfHavePermissionFromRequestBody(req, Utilisateur,"utilisateur_2")
        }
    }

   /**
     *
     * @param {Request} req
     * @returns {Promise<*>}
     */
   async findByIdService(req) {
        const utilisateurId = utils.getDataFromRequestToken(req).id
        const destinataireId = req.params.id
        const resp = await this._getMessageFromUtilisateurs(utilisateurId, destinataireId);
        return resp === null ? null : resp['conversations'].sort(this.compareMessages)
   }

    /**
     *
     * @param {string} utilisateur_1
     * @param {string} utilisateur_2
     * @returns {Promise<any>}
     * @private
     */
   async _getMessageFromUtilisateurs(utilisateur_1, utilisateur_2) {
       return Message.findOne(this._getFilterObjectByUtilisateur(utilisateur_1, utilisateur_2))
   }

    /**
     *
     * @param utilisateur_1
     * @param utilisateur_2
     * @returns {{$or: [{utilisateur_1, utilisateur_2},{utilisateur_1, utilisateur_2}]}}
     * @private
     */
   _getFilterObjectByUtilisateur(utilisateur_1, utilisateur_2) {
       return  {
           $or: [
               {
                   utilisateur_1: utilisateur_1,
                   utilisateur_2: utilisateur_2,
               },
               {
                   utilisateur_1: utilisateur_2,
                   utilisateur_2: utilisateur_1,
               }
           ]
       }
   }

}
module.exports = MessageService;
