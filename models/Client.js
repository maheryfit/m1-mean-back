import {Utilisateur} from "./Utilisateur.js";
import {Voiture} from "./Voiture.js";
import {ObjectId} from "mongodb";
import * as console from "node:console";
import {Abonnement} from "./Abonnement.js";
import {StatutClient} from "./StatutClient.js";
import {Rdv as SessClient, Rdv} from "./Rdv.js";
import {Paiement} from "./Paiement.js";

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
    #etat;
    #abonnement;

    get abonnement() {
        return this.#abonnement;
    }

    set abonnement(value) {
        this.#abonnement = value;
    }

    get etat() {
        return this.#etat;
    }

    set etat(value) {
        this.#etat = value;
    }

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
                date_inscription:new Date(),
                idstatut:new ObjectId(config.STATUT_CLIENT_SIMPLE_ID),
                idabonnement:new ObjectId(config.ABONNEMENT_SIMPLE_ID),
                idutilisateur:utilisateurInserted._id,
                etat:Number(config.ETAT_CLIENT_CREE)
            }
            await collection.insertOne(clientToInsert,{session});
            if(openedSession){
                await session.commitTransaction();
            }
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
            const collection=connection.db().collection(Client.table);
            const utilisateur=await super.connexion(connection,session,config);
            const client=await collection.findOne({idutilisateur:utilisateur._id,etat:Number(config.ETAT_CLIENT_CREE)},{session});
            if(client===null){
                throw new Error("Utilisateur introuvable");
            }
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
    async getVoitures(connection,sess,config,page,limit){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const pageNumber=Number(page);
            const limitNumber=Number(limit);
            const collection=connection.db().collection(Voiture.table);
            const voitures=await collection.find({idclient:new ObjectId(this.idclient),etat:Number(config.ETAT_VOITURE_CREE)},{session})
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
    async countVoitures(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Voiture.table);
            const count=await collection.countDocuments({idclient:new ObjectId(this.idclient),etat:Number(config.ETAT_VOITURE_CREE)},{session});
            return count;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async creerVoiture(connection,sess,config,voiture){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Voiture.table);
            if(openedSession){
                session.startTransaction();
            }
            const voitureToInsert={
                description:voiture.description,
                immatriculation:voiture.immatriculation,
                caracteristiques:voiture.caracteristiques,
                etat:Number(config.ETAT_VOITURE_CREE),
                idclient:new ObjectId(this.idclient),
            }
            await collection.insertOne(voitureToInsert,{session});
            if(openedSession){
                await session.commitTransaction();
            }
            return voitureToInsert;
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
    async supprimerVoiture(connection,sess,config,idvoiture){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Voiture.table);
            if(openedSession){
                session.startTransaction();
            }
            await collection.updateOne({_id:new ObjectId(idvoiture),idclient:new ObjectId(this.idclient)},{$set:{etat:Number(config.ETAT_VOITURE_SUPPRIME)}},{session});
            if(openedSession){
                await session.commitTransaction();
            }
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
    async getDetailsClient(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Client.table);
            const client=await collection.findOne(
                {_id:new ObjectId(this.idclient),etat:Number(config.ETAT_CLIENT_CREE)},
                {etat:-1},
                {session});
            return client;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async getAbonnement(connection,sess){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Abonnement.table);
            const abonnement=await collection.findOne({_id:new ObjectId(this.abonnement.idabonnement)},{session});
            return abonnement;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async getStatut(connection,sess){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(StatutClient.table);
            const statut=await collection.findOne({_id:new ObjectId(this.statut.idstatut)},{session});
            return statut;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async creerRdv(connection,sess,config,rdv){
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
            const rdvToInsert=rdv;

            const details=await this.getDetailsClient(connection,session,config);
            this.abonnement=new Abonnement();
            this.abonnement.idabonnement=details.idabonnement;
            const abonnement=await this.getAbonnement(connection,session,config);
            this.statut=new StatutClient();
            this.statut.idstatut=details.idstatut;
            const statut=await this.getStatut(connection,session,config);
            this.idutilisateur=details.idutilisateur;
            const utilisateur=await this.getUtilisateur(connection,session,config);
            rdvToInsert.client= {
                idclient:new ObjectId(this.idclient),
                nom:details.nom,
                prenom:details.prenom,
                telephone:details.telephone,
                date_inscription:details.date_inscription,
                abonnement:abonnement,
                statut:statut,
                utilisateur:utilisateur,
            };

            rdvToInsert.diagnostics=[];
            rdvToInsert.mecanicien=null;
            rdvToInsert.station._idstation=new ObjectId(rdvToInsert.station._idstation);
            for(let i=0;i<rdvToInsert.services.length;i++){
                rdvToInsert.services[i]._idservice=new ObjectId(rdvToInsert.services[i]._idservice);
            }
            rdvToInsert.voiture._idvoiture=new ObjectId(rdvToInsert.voiture._idvoiture);
            rdvToInsert.dateheure=new Date(rdvToInsert.dateheure);
            rdvToInsert.etat=config.ETAT_RDV_CREE;
            await collection.insertOne(rdvToInsert,{session});
            if(openedSession){
                await session.commitTransaction();
            }
            return rdvToInsert;
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
            const rdv=await collection.find({"client.idclient":new ObjectId(this.idclient), etat:{ $lt:config.ETAT_RDV_PAYE }},{session})
                .skip((pageNumber-1)*limitNumber)
                .limit(limitNumber)
                .project({"voiture._description":1,"station._nom":1,dateheure:1,reste_a_payer:1}).toArray();
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
            const count=await collection.countDocuments({"client.idclient":new ObjectId(this.idclient), etat:{ $lt:config.ETAT_RDV_PAYE }},{session})
            return count;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async ajouterServiceRdv(connection,sess,config,rdv,service){
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
            let detailsRdv=await collection.findOne(
                {_id:new ObjectId(rdv.idrdv),"client.idclient":new ObjectId(this.idclient),etat:Number(config.ETAT_RDV_CREE)},
                {services:1,montant:1,reste_a_payer:1,duree:1},
                {session});
            if(detailsRdv===null){
                throw new Error("La maintenance est déjà clôturée.")
            }
            let servicesRdv=detailsRdv.services;
            service._idservice=new ObjectId(service._idservice);
            servicesRdv.push(service);
            await collection.updateOne(
                {_id:new ObjectId(rdv.idrdv),"client.idclient":new ObjectId(this.idclient),etat:Number(config.ETAT_RDV_CREE)},
                {$set:{
                    services:servicesRdv,
                    montant:detailsRdv.montant+service._tarif,
                    reste_a_payer:detailsRdv.reste_a_payer+service._tarif,
                    duree:detailsRdv.duree+service._duree
                }},
                {session});
            if(openedSession){
                await session.commitTransaction();
            }
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
    async payerRdv(connection,sess,config,rdv,paiement){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Paiement.table);
            if(openedSession){
                session.startTransaction();
            }
            const details=await this.getDetailsClient(connection,session,config);
            this.abonnement=new Abonnement();
            this.abonnement.idabonnement=details.idabonnement;
            const abonnement=await this.getAbonnement(connection,session,config);
            this.statut=new StatutClient();
            this.statut.idstatut=details.idstatut;
            const statut=await this.getStatut(connection,session,config);
            this.idutilisateur=details.idutilisateur;
            const utilisateur=await this.getUtilisateur(connection,session,config);
            const client= {
                idclient:new ObjectId(this.idclient),
                nom:details.nom,
                prenom:details.prenom,
                telephone:details.telephone,
                date_inscription:details.date_inscription,
                abonnement:abonnement,
                statut:statut,
                utilisateur:utilisateur,
            };
            let paiementToInsert={
                montant:paiement.montant,
                dateheure:new Date(),
                etat:config.ETAT_PAIEMENT_CREE,
                client:client,
                idrdv:new ObjectId(rdv.idrdv)
            }
            await collection.insertOne(paiementToInsert,{session});
            await rdv.actualiserResteAPayer(connection,session,config,paiementToInsert);
            if(openedSession){
                await session.commitTransaction();
            }
            return paiementToInsert;
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

    async paginationVoiture(connection,sess,config,page,limit){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const voitures=await this.getVoitures(connection,session,config,page,limit);
            const countVoitures=await this.countVoitures(connection,session,config);
            return [voitures,countVoitures];
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async interfaceCreationRdv(connection,sess,config,stationParam){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const details=await this.getDetailsClient(connection,session,config);
            this.abonnement=new Abonnement();
            this.abonnement.idabonnement=details.idabonnement;
            this.statut=new StatutClient();
            this.statut.idstatut=details.idstatut;
            const abonnement=await this.getAbonnement(connection,session);
            const statut=await this.getStatut(connection,session);

            const station=await stationParam.getStation(connection,session,config);
            return [station,abonnement,statut];
        }finally{
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
    async detailsProfil(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const detailsClient=await this.getDetailsClient(connection,session,config);
            this.statut=new StatutClient();
            this.statut.idstatut=detailsClient.idstatut;
            const statut=await this.getStatut(connection,session,config);
            this.abonnement=new Abonnement();
            this.abonnement.idabonnement=detailsClient.idabonnement;
            const abonnement=await this.getAbonnement(connection,session,config);
            this.idutilisateur=detailsClient.idutilisateur;
            const utilisateur=await this.getUtilisateur(connection,session,config);
            const profil=detailsClient;
            profil.abonnement=abonnement;
            profil.statut=statut;
            profil.utilisateur=utilisateur;
            return profil;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
}