class SocketPairUtilisateur {

    constructor() {
        this.clientRedis = require("./serviceTierceUtil").redisService;
        this.socketKey = require("../config").SOCKET_KEY_REDIS;
        this.delayRedisSeconds = require("../config").DELAY_REDIS_SECONDS;
    }

    /**
     *
     * @param {string} utilisateur_id
     * @returns {Promise<[]>}
     */
    async getSocketIdsByUtilisateur(utilisateur_id) {
        let toReturn = [];
        const instance = await this._getInstance()
        for (const entry in instance) {
            if (instance[entry].includes(utilisateur_id))
                toReturn.push(entry);
        }
        return toReturn
    }

    /**
     *
     * @returns {Promise<[]>}
     */
    async getUtilisateurIds() {
        let toReturn = [];
        const instance = await this._getInstance();
        for (const entry in instance) {
            toReturn.push(instance[entry]);
        }
        return toReturn
    }

    /**
     *
     * @param {string} socket_id
     * @param {string} utilisateur_id
     */
    async storeSocketIdAndUtilisateurId(socket_id, utilisateur_id) {
        const instance = await this._getInstance();
        instance[socket_id] = utilisateur_id
        await this._writeDataInCache(instance)
    }


     /**
     *
     * @param {string} socket_id
     */
    async invalidateSocketId(socket_id) {
        const instance = await this._getInstance();
        delete instance[socket_id];
        await this._writeDataInCache(instance)
    }

    static _getInstance() {
        if (this.mapSocketUtilisateurInstance) {
            return this.mapSocketUtilisateurInstance;
        }
        this.mapSocketUtilisateurInstance = new Map();
        return this.mapSocketUtilisateurInstance;
    }

    /**
     *
     * @param {Object} data
     * @returns {Promise<void>}
     * @private
     */
    async _writeDataInCache(data) {
        await this.clientRedis.setEx(this.socketKey, this.delayRedisSeconds, JSON.stringify(data));
    }

    /**
     *
     * @returns {Promise<{}|any>}
     * @private
     */
    async _getInstance() {
        const data = await this.clientRedis.get(this.socketKey)
        if (data) {
            return JSON.parse(data);
        }
        return {};
    }
}

module.exports = SocketPairUtilisateur;
