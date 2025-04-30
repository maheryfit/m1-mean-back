import * as process from "node:process";

export class Constantes{
    #SALT_ROUNDS;
    #STATUT_CLIENT_SIMPLE_ID;
    #ABONNEMENT_SIMPLE_ID;
    #COOKIE_CONFIG;
    #COOKIE_KEY;
    #PROFIL_CLIENT;
    #PROFIL_MECANICIEN;
    #PROFIL_MANAGER;
    #ETAT_UTILISATEUR_CREE;
    #ETAT_UTILISATEUR_SUPPRIME;
    #ETAT_CLIENT_CREE;
    #ETAT_CLIENT_SUPPRIME;
    #ETAT_MECANICIEN_CREE;
    #ETAT_MECANICIEN_SUPPRIME;
    #ETAT_VOITURE_CREE;
    #ETAT_VOITURE_SUPPRIME;
    #ETAT_STATION_CREE;
    #ETAT_STATION_SUPPRIME;
    #ETAT_SERVICE_CREE;
    #ETAT_SERVICE_SUPPRIME;
    #ETAT_RDV_CREE;
    #ETAT_RDV_CLOS;
    #ETAT_RDV_PAYE;
    #ETAT_RDV_SUPPRIME;
    #ETAT_NIVEAU_CREE;
    #ETAT_NIVEAU_SUPPRIME;
    #ETAT_ROLE_CREE;
    #ETAT_ROLE_SUPPRIME;

    get ETAT_ROLE_CREE() {
        return this.#ETAT_ROLE_CREE;
    }

    get ETAT_ROLE_SUPPRIME() {
        return this.#ETAT_ROLE_SUPPRIME;
    }

    get ETAT_NIVEAU_CREE() {
        return this.#ETAT_NIVEAU_CREE;
    }

    get ETAT_NIVEAU_SUPPRIME() {
        return this.#ETAT_NIVEAU_SUPPRIME;
    }

    get ETAT_MECANICIEN_CREE() {
        return this.#ETAT_MECANICIEN_CREE;
    }

    get ETAT_MECANICIEN_SUPPRIME() {
        return this.#ETAT_MECANICIEN_SUPPRIME;
    }

    get ETAT_RDV_PAYE() {
        return this.#ETAT_RDV_PAYE;
    }

    get ETAT_RDV_CLOS() {
        return this.#ETAT_RDV_CLOS;
    }

    get ETAT_RDV_CREE() {
        return this.#ETAT_RDV_CREE;
    }

    get ETAT_RDV_SUPPRIME() {
        return this.#ETAT_RDV_SUPPRIME;
    }

    get ABONNEMENT_SIMPLE_ID() {
        return this.#ABONNEMENT_SIMPLE_ID;
    }

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
        this.#STATUT_CLIENT_SIMPLE_ID="6809fb13a773274d10b2fa2a";
        this.#ABONNEMENT_SIMPLE_ID="67d5bb4c3c212676c4fa60fd";
        this.#COOKIE_CONFIG= {
            httpOnly: true, // Prevents access from JavaScript
            // secure: "true", // Works only on HTTPS and HTTP
            // sameSite: "None", // Prevents CSRF
            maxAge: 2 * 60 * 60 * 1000, // -> 2h // 30 * 24 * 60 * 60 * 1000, // -> 30 days
        }
        this.#COOKIE_KEY=process.env.COOKIE_KEY;
        this.#PROFIL_CLIENT=1;
        this.#PROFIL_MECANICIEN=5;
        this.#PROFIL_MANAGER=10;
        this.#ETAT_UTILISATEUR_CREE=1;
        this.#ETAT_UTILISATEUR_SUPPRIME=10;
        this.#ETAT_CLIENT_CREE=1;
        this.#ETAT_CLIENT_SUPPRIME=10;
        this.#ETAT_MECANICIEN_CREE=1;
        this.#ETAT_MECANICIEN_SUPPRIME=10;
        this.#ETAT_VOITURE_CREE=1;
        this.#ETAT_VOITURE_SUPPRIME=10;
        this.#ETAT_STATION_CREE=1;
        this.#ETAT_STATION_SUPPRIME=10;
        this.#ETAT_SERVICE_CREE=1;
        this.#ETAT_SERVICE_SUPPRIME=10;
        this.#ETAT_RDV_CREE=1;
        this.#ETAT_RDV_CLOS=5;
        this.#ETAT_RDV_PAYE=7;
        this.#ETAT_RDV_SUPPRIME=10;
        this.#ETAT_NIVEAU_CREE=1;
        this.#ETAT_NIVEAU_SUPPRIME=10;
        this.#ETAT_ROLE_CREE=1;
        this.#ETAT_ROLE_SUPPRIME=10;
    }
}