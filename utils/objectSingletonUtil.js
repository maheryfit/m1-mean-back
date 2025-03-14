const tokenUtil = require('./tokenUtil');

class SocketPairUtilisateur {
    private static mapSocketUtilisateurInstance: Map<string, string>;

    /**
     *
     * @param {string} utilisateur_id
     */
    static getSocketIdByUtilisateur(utilisateur_id) {
        let toReturn = [];
        for (const entry of this._getInstance()) {
            if (entry.includes(utilisateur_id))
                toReturn.push(entry[0]);
        }
        return toReturn
    }

    /**
     *
     * @param {string} socket_id
     * @param {string} utilisateur_id
     */
    static storeSocketIdAndUtilisateurId(socket_id, utilisateur_id) {
        this._getInstance().set(socket_id, utilisateur_id);
    }

    /**
     *
     * @param {string} socket_id
     */
    static invalidateSocketId(socket_id) {
        this._getInstance().delete(socket_id);
    }

    static _getInstance() {
        if (this.mapSocketUtilisateurInstance) {
            return this.mapSocketUtilisateurInstance;
        }
        this.mapSocketUtilisateurInstance = new Map<string, string>();
        return this.mapSocketUtilisateurInstance;
    }
}

module.exports = SocketPairUtilisateur;
