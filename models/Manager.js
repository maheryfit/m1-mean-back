import {Utilisateur} from "./Utilisateur.js";

export class Manager extends Utilisateur{
    static #table="managers";

    static get table() {
        return this.#table;
    }
    #idmanager;
    #nom;
    #prenom;
    #telephone;
    #etat;

    get idmanager() {
        return this.#idmanager;
    }

    set idmanager(value) {
        this.#idmanager = value;
    }

    get nom() {
        return this.#nom;
    }

    set nom(value) {
        this.#nom = value;
    }

    get prenom() {
        return this.#prenom;
    }

    set prenom(value) {
        this.#prenom = value;
    }

    get telephone() {
        return this.#telephone;
    }

    set telephone(value) {
        this.#telephone = value;
    }

    get etat() {
        return this.#etat;
    }

    set etat(value) {
        this.#etat = value;
    }

    async connexion(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(this.table);
            const utilisateur=await super.connexion(connection,session,config);
            const manager=await collection.findOne({idutilisateur:utilisateur._id,etat:Number(config.ETAT_MANAGER_CREE)},{session});
            if(manager===null){
                throw new Error("Utilisateur introuvable");
            }
            return {
                idutilisateur: utilisateur._id,
                idmanager: manager._id,
                nom_utilisateur: utilisateur.nom_utilisateur,
                profil: utilisateur.profil
            };
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
}
