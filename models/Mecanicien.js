import {Utilisateur} from "./Utilisateur.js";
import {Rdv} from "./Rdv.js";
import {ObjectId} from "mongodb";
import {Niveau} from "./Niveau.js";
import {Role} from "./Role.js";

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
            const rdv=await collection.find({etat:{ $lt:config.ETAT_RDV_PAYE }},{session})
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
            const count=await collection.countDocuments({etat:{ $lt:config.ETAT_RDV_PAYE }},{session})
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
console.log(error);
            }
            throw error;
        }finally {
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async getMecanicien(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Mecanicien.table);
            const mecanicien=await collection.findOne({_id:new ObjectId(this.idmecanicien),etat:config.ETAT_MECANICIEN_CREE},{session});
            return mecanicien;
        }finally {
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async getNiveau(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Niveau.table);
            const niveau=await collection.findOne({_id:new ObjectId(this.niveau.idniveau),etat:config.ETAT_NIVEAU_CREE},{session});
            return niveau;
        }finally {
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async getRole(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Role.table);
            const role=await collection.findOne({_id:new ObjectId(this.role.idrole),etat:config.ETAT_NIVEAU_CREE},{session});
            return role;
        }finally {
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async prendreRdvEnCharge(connection,sess,config,rdv){
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
            const mecanicien=await this.getMecanicien(connection,session,config);
            this.niveau=new Niveau();
            this.niveau.idniveau=mecanicien.idniveau;
            let niveau=await this.getNiveau(connection,session,config);
            niveau={
                _id:new ObjectId(niveau._id),
                nom:niveau.nom,
                coefficient_salarial:niveau.coefficient_salarial
            };
            this.role=new Role();
            this.role.idrole=mecanicien.idrole;
            let role=await this.getRole(connection,session,config);
            role={
                _id:new ObjectId(role._id),
                nom:role.nom,
                salaire_mensuel:role.salaire_mensuel
            }
            this.idutilisateur=mecanicien.idutilisateur;
            const utilisateur=await this.getUtilisateur(connection,session,config);
            const mecanicienToPut={
                _id:new ObjectId(mecanicien._id),
                nom:mecanicien.nom,
                prenom:mecanicien.prenom,
                telephone:mecanicien.telephone,
                niveau:niveau,
                role:role,
                utilisateur:utilisateur
            };
            await collection.updateOne({_id:new ObjectId(rdv.idrdv),mecanicien:null,etat:Number(config.ETAT_RDV_CREE)},{$set:{mecanicien:mecanicienToPut}},{session});
            if(openedSession){
                await session.commitTransaction();
            }
            return mecanicienToPut;
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
    async cloturerRdv(connection,sess,config,rdv){
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
            const detailsRdv=await rdv.getRdvEnCours(connection,session,config);
            if(detailsRdv.mecanicien===null){
                throw new Error("Aucun mécanicien n'a encore été assigné à cette maintenance.");
            }
            await collection.updateOne({_id:new ObjectId(rdv.idrdv),etat:Number(config.ETAT_RDV_CREE)},{$set:{etat:Number(config.ETAT_RDV_CLOS)}},{session});
            if(openedSession){
                await session.commitTransaction();
            }
        }catch(error){
            if(openedSession){
                await session.abortTransaction();
console.log(error);
            }
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