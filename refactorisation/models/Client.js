import {Utilisateur} from "./Utilisateur.js";
import {Constantes} from "../utils/Constantes.js";

export class Client extends Utilisateur{
    static #table="clients";
    #nom;
    #prenom;
    #telephone;
    #dateInscription;
    #statut;

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
    async inscription(connection,sess){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Client.#table);
            if(openedSession){
                session.startTransaction();
            }
            const utilisateurInserted=await super.inscription(connection,session);
            const clientToInsert={
                nom:this.nom,
                prenom:this.prenom,
                telephone:this.telephone,
                dateInscription:new Date(),
                statut:Constantes.STATUT_CLIENT_SIMPLE_ID,
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
}