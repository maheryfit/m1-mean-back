import {ObjectId} from "mongodb";
import {Paiement} from "./Paiement.js";

export class Rdv{
    static #table="rdvs";

    static get table() {
        return this.#table;
    }

    #idrdv;
    #description;
    #dateheure;
    #duree;
    #montant;
    #resteAPayer;
    #voiture;
    #services;
    #remises;
    #diagnostics;
    #client;
    #mecanicien;
    #station;

    get idrdv() {
        return this.#idrdv;
    }

    set idrdv(value) {
        this.#idrdv = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get dateheure() {
        return this.#dateheure;
    }

    set dateheure(value) {
        this.#dateheure = value;
    }

    get duree() {
        return this.#duree;
    }

    set duree(value) {
        this.#duree = value;
    }

    get montant() {
        return this.#montant;
    }

    set montant(value) {
        this.#montant = value;
    }

    get resteAPayer() {
        return this.#resteAPayer;
    }

    set resteAPayer(value) {
        this.#resteAPayer = value;
    }

    get voiture() {
        return this.#voiture;
    }

    set voiture(value) {
        this.#voiture = value;
    }

    get services() {
        return this.#services;
    }

    set services(value) {
        this.#services = value;
    }

    get remises() {
        return this.#remises;
    }

    set remises(value) {
        this.#remises = value;
    }

    get diagnostics() {
        return this.#diagnostics;
    }

    set diagnostics(value) {
        this.#diagnostics = value;
    }

    get client() {
        return this.#client;
    }

    set client(value) {
        this.#client = value;
    }

    get mecanicien() {
        return this.#mecanicien;
    }

    set mecanicien(value) {
        this.#mecanicien = value;
    }

    get station() {
        return this.#station;
    }

    set station(value) {
        this.#station = value;
    }

    async getRdvEnCours(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=await connection.db().collection(Rdv.table);
            const rdv=await collection.findOne({_id:new ObjectId(this.idrdv),etat:{ $lt:Number(config.ETAT_RDV_PAYE) }},{session});
            return rdv;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async getPaiements(connection,sess,config,page,limit){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const pageNumber=Number(page);
            const limitNumber=Number(limit);
            const collection=await connection.db().collection(Paiement.table);
            const paiements=await collection.find({idrdv:new ObjectId(this.idrdv),etat:Number(config.ETAT_PAIEMENT_CREE)},{session})
                .skip((pageNumber-1)*limitNumber)
                .limit(limitNumber)
                .toArray();
            return paiements;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async countPaiements(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=await connection.db().collection(Paiement.table);
            const countPaiements=await collection.countDocuments({idrdv:new ObjectId(this.idrdv),etat:Number(config.ETAT_PAIEMENT_CREE)},{session});
            return countPaiements;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async actualiserResteAPayer(connection,sess,config,paiement){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Rdv.table);
            if(openedSession){
                await session.startTransaction();
            }
            const details=await this.getRdvEnCours(connection,session,config);
            if(details.reste_a_payer<=0){
                throw new Error("La maintenance est entièrement payée.");
            }
            await collection.updateOne({_id:new ObjectId(this.idrdv),reste_a_payer:{$gt:0},etat:{$lt:Number(config.ETAT_RDV_PAYE)}},{$set:{reste_a_payer:details.reste_a_payer-paiement.montant}}, {session});
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

    async paginationPaiements(connection,sess,config,page,limit){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const paiements=await this.getPaiements(connection,session,config,page,limit);
            const countPaiements=await this.countPaiements(connection,session,config);
            return [paiements,countPaiements];
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
}