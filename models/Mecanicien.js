import {Utilisateur} from "./Utilisateur.js";
import {Rdv} from "./Rdv.js";
import {ObjectId} from "mongodb";

export class Mecanicien extends Utilisateur{
    static #table="mecaniciens";

    static get table() {
        return this.#table;
    }
    #idmecanicien;
    #nom;
    #prenom;
    #telephone;
    #etat;
    #niveau;
    #role;

    get niveau() {
        return this.#niveau;
    }

    set niveau(value) {
        this.#niveau = value;
    }

    get role() {
        return this.#role;
    }

    set role(value) {
        this.#role = value;
    }

    get idmecanicien() {
        return this.#idmecanicien;
    }

    set idmecanicien(value) {
        this.#idmecanicien = value;
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

    constructor(obj){
        super(obj);
    }

    async connexion(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Mecanicien.table);
            const utilisateur=await super.connexion(connection,session,config);
            const mecanicien=await collection.findOne({idutilisateur:utilisateur._id,etat:Number(config.ETAT_MECANICIEN_CREE)},{session});
            if(mecanicien===null){
                throw new Error("Utilisateur introuvable");
            }
            const utilisateurToReturn={
                idutilisateur:utilisateur._id,
                idmecanicien:mecanicien._id,
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
    async getListeRdvEnCours(connection,sess,config,page,limit){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const pageNumber=Number(page);
            const limitNumber=Number(limit);
            const collection=connection.db().collection(Rdv.table);
            const rdv=await collection.find({etat:{ $lt:config.ETAT_RDV_TERMINE }},{session})
                .skip((pageNumber-1)*limitNumber)
                .limit(limitNumber)
                .project({"client.utilisateur.nom_utilisateur":1,"voiture._description":1,"station._nom":1,dateheure:1,reste_a_payer:1}).toArray();
            return rdv;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async countRdvEnCours(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Rdv.table);
            const count=await collection.countDocuments({etat:{ $lt:config.ETAT_RDV_TERMINE }},{session})
            return count;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async ajouterDiagnostic(connection,sess,config,rdv,diagnostic){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Rdv.table);
            if(openedSession){
                session.startTransaction();
            }
            let diagsRdv=await collection.findOne({_id:new ObjectId(rdv.idrdv),etat:Number(config.ETAT_RDV_CREE)},{diagnostics:1},{session});
            diagsRdv=diagsRdv.diagnostics;
            diagnostic.idmecanicien=new ObjectId(this.idmecanicien);
            diagnostic.nom_utilisateur_mecanicien=this.nomUtilisateur;
            diagsRdv.push(diagnostic);
            await collection.updateOne({_id:new ObjectId(rdv.idrdv),etat:Number(config.ETAT_RDV_CREE)},{$set:{diagnostics:diagsRdv}},{session});
            if(openedSession){
                await session.commitTransaction();
            }
        }catch(error){
            if(openedSession){
                await session.abortTransaction();
            }
            console.log(error);
            throw error;
        }finally {
            if(openedSession){
                await session.endSession();
            }
        }
    }

    async paginationListeRdv(connection,sess,config,page,limit){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const rdvs=await this.getListeRdvEnCours(connection,session,config,page,limit);
            const countRdv=await this.countRdvEnCours(connection,session,config);
            return [rdvs,countRdv];
        }finally {
            if(openedSession){
                await session.endSession();
            }
        }
    }
}