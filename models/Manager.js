import {Utilisateur} from "./Utilisateur.js";

export class Manager extends Utilisateur{
    static #table="managers";

    static get table() {
        return this.#table;
    }
    #idmanager;
    #nom;
    #prenom;
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

    get etat() {
        return this.#etat;
    }

    set etat(value) {
        this.#etat = value;
    }

    constructor(obj){
        super(obj);
        this.nom = obj.nom;
        this.prenom = obj.prenom;
    }

    async inscription(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Manager.table);
            if(openedSession){
                session.startTransaction();
            }
            const utilisateurInserted=await super.inscription(connection,session,config);
            const managerToInsert={
                nom:this.nom,
                prenom:this.prenom,
                idutilisateur:utilisateurInserted._id,
                etat:Number(config.ETAT_MANAGER_CREE)
            }
            await collection.insertOne(managerToInsert,{session});
            if(openedSession){
                await session.commitTransaction();
            }
            managerToInsert["id"] = managerToInsert._id;
            return managerToInsert
        }catch(error){
            if(openedSession){
                await session.abortTransaction();
                console.log(error);
            }
            throw error;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }

    async connexion(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Manager.table);
            const utilisateur=await super.connexion(connection,session,config);
            const manager=await collection.findOne({idutilisateur:utilisateur._id,etat:Number(config.ETAT_MANAGER_CREE)},{session});
            if(manager===null){
                throw new Error("Utilisateur introuvable");
            }
            return {
                idutilisateur: utilisateur._id,
                id: manager._id,
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
