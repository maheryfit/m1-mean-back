import {Utilisateur} from "./Utilisateur.js";
import {Voiture} from "./Voiture.js";
import * as console from "node:console";

export class Client extends Utilisateur{
    static #table="clients";
    static get table() {
        return this.#table;
    }

    #idclient;
    #nom;
    #prenom;
    #telephone;
    #dateInscription;
    #statut;

    get idclient() {
        return this.#idclient;
    }

    set idclient(value) {
        this.#idclient = value;
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

    get dateInscription() {
        return this.#dateInscription;
    }

    set dateInscription(value) {
        this.#dateInscription = value;
    }

    get statut() {
        return this.#statut;
    }

    set statut(value) {
        this.#statut = value;
    }
    constructor(obj) {
        super(obj);
        this.nom = obj.nom;
        this.prenom = obj.prenom;
        this.telephone = obj.telephone;
        this.dateInscription = obj.dateInscription;
        this.statut = obj.statut;
    }
    turnToObject(){
        return {
            nom: this.nom,
            prenom: this.prenom,
            telephone: this.telephone,
            dateInscription: this.dateInscription,
            statut: this.statut
        }
    }
    async inscription(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Client.table);
            if(openedSession){
                session.startTransaction();
            }
            const utilisateurInserted=await super.inscription(connection,session,config);
            const clientToInsert={
                nom:this.nom,
                prenom:this.prenom,
                telephone:this.telephone,
                dateInscription:new Date(),
                statut:config.STATUT_CLIENT_SIMPLE_ID,
                idutilisateur:utilisateurInserted._id
            }
            await collection.insertOne(clientToInsert,{session});
            if(openedSession){
                await session.commitTransaction();
            }
        }catch(error){
            if(openedSession){
                await session.abortTransaction();
            }
            console.log(error);
            throw error;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async connexion(connection,sess){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Client.table);
            const utilisateur=await super.connexion(connection,session);
            const client=await collection.findOne({idutilisateur:utilisateur._id},{session});
            const utilisateurToReturn={
                idutilisateur:utilisateur._id,
                idclient:client._id,
                nom_utilisateur:utilisateur.nom_utilisateur,
                profil:utilisateur.profil
            };
            return utilisateurToReturn;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async getVoitures(connection,sess,page,limit){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const pageNumber=Number(page);
            const limitNumber=Number(limit);
            const collection=await connection.db().collection(Voiture.table);
            const voitures=await collection.find({idclient:this.idclient},{session})
                .skip((pageNumber-1)*limitNumber)
                .limit(limitNumber)
                .toArray();
            return voitures;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async countVoitures(connection,sess){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=await connection.db().collection(Voiture.table);
            const count=await collection.countDocuments({idclient:this.idclient},{session});
            return count;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
}