import * as process from "node:process";

export class Constantes{
    #SALT_ROUNDS;
    #STATUT_CLIENT_SIMPLE_ID;
    #STATUT_CLIENT_FIDELE_ID;
    #COOKIE_CONFIG;
    #COOKIE_KEY;
    #PROFIL_CLIENT;
    #PROFIL_MECANICIEN;
    #PROFIL_MANAGER;
    #ETAT_UTILISATEUR_CREE;
    #ETAT_UTILISATEUR_SUPPRIME;
    #ETAT_CLIENT_CREE;
    #ETAT_CLIENT_SUPPRIME;
    #ETAT_VOITURE_CREE;
    #ETAT_VOITURE_SUPPRIME;
    #ETAT_STATION_CREE;
    #ETAT_STATION_SUPPRIME;
    #ETAT_SERVICE_CREE;
    #ETAT_SERVICE_SUPPRIME;

    get ETAT_SERVICE_CREE() {
        return this.#ETAT_SERVICE_CREE;
    }

    get ETAT_SERVICE_SUPPRIME() {
        return this.#ETAT_SERVICE_SUPPRIME;
    }

    get ETAT_UTILISATEUR_CREE() {
        return this.#ETAT_UTILISATEUR_CREE;
    }

    get ETAT_UTILISATEUR_SUPPRIME() {
        return this.#ETAT_UTILISATEUR_SUPPRIME;
    }

    get ETAT_STATION_CREE() {
        return this.#ETAT_STATION_CREE;
    }

    get ETAT_STATION_SUPPRIME() {
        return this.#ETAT_STATION_SUPPRIME;
    }

    get ETAT_VOITURE_CREE() {
        return this.#ETAT_VOITURE_CREE;
    }

    get ETAT_VOITURE_SUPPRIME() {
        return this.#ETAT_VOITURE_SUPPRIME;
    }

    get PROFIL_CLIENT() {
        return this.#PROFIL_CLIENT;
    }

    get PROFIL_MECANICIEN() {
        return this.#PROFIL_MECANICIEN;
    }

    get PROFIL_MANAGER() {
        return this.#PROFIL_MANAGER;
    }

    get COOKIE_KEY() {
        return this.#COOKIE_KEY;
    }

    get SALT_ROUNDS() {
        return this.#SALT_ROUNDS;
    }

    get STATUT_CLIENT_SIMPLE_ID() {
        return this.#STATUT_CLIENT_SIMPLE_ID;
    }

    get STATUT_CLIENT_FIDELE_ID() {
        return this.#STATUT_CLIENT_FIDELE_ID;
    }

    get COOKIE_CONFIG() {
        return this.#COOKIE_CONFIG;
    }

    get ETAT_CLIENT_CREE() {
        return this.#ETAT_CLIENT_CREE;
    }

    get ETAT_CLIENT_SUPPRIME() {
        return this.#ETAT_CLIENT_SUPPRIME;
    }

    constructor() {
        this.#SALT_ROUNDS=10;
        this.#STATUT_CLIENT_SIMPLE_ID=1;
        this.#STATUT_CLIENT_FIDELE_ID=2;
        this.#COOKIE_CONFIG= {
            httpOnly: true, // Prevents access from JavaScript
            secure: (process.env.PRODUCTION==="true"), // Works only on HTTPS and HTTP
            sameSite: "Strict", // Prevents CSRF
            maxAge: 2 * 60 * 60 * 1000, // -> 2h // 30 * 24 * 60 * 60 * 1000, // -> 30 days
        }
        this.#COOKIE_KEY=process.env.COOKIE_KEY;
        this.#PROFIL_CLIENT=1;
        this.#PROFIL_MECANICIEN=5;
        this.#PROFIL_MECANICIEN=10;
        this.#ETAT_UTILISATEUR_CREE=process.env.ETAT_UTILISATEUR_CREE;
        this.#ETAT_UTILISATEUR_SUPPRIME=process.env.ETAT_UTILISATEUR_SUPPRIME;
        this.#ETAT_CLIENT_CREE=process.env.ETAT_CLIENT_CREE;
        this.#ETAT_CLIENT_SUPPRIME=process.env.ETAT_CLIENT_SUPPRIME;
        this.#ETAT_VOITURE_CREE=process.env.ETAT_VOITURE_CREE;
        this.#ETAT_VOITURE_SUPPRIME=process.env.ETAT_VOITURE_SUPPRIME;
        this.#ETAT_STATION_CREE=process.env.ETAT_STATION_CREE;
        this.#ETAT_STATION_SUPPRIME=process.env.ETAT_STATION_SUPPRIME;
        this.#ETAT_SERVICE_CREE=process.env.ETAT_SERVICE_CREE;
        this.#ETAT_SERVICE_SUPPRIME=process.env.ETAT_SERVICE_SUPPRIME;
    }
}