import {Utilisateur} from "./Utilisateur.js";

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
}