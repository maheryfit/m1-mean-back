import {ObjectId} from "mongodb";

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

    async getRdv(connection,sess,config){
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
}