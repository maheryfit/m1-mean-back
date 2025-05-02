export class Paiement{
    static #table="paiements";

    static get table() {
        return this.#table;
    }
    #idpaiement;
    #montant;
    #dateheure;
    #etat;
    #client;
    #rdv;

    get idpaiement() {
        return this.#idpaiement;
    }

    set idpaiement(value) {
        this.#idpaiement = value;
    }

    get montant() {
        return this.#montant;
    }

    set montant(value) {
        this.#montant = value;
    }

    get dateheure() {
        return this.#dateheure;
    }

    set dateheure(value) {
        this.#dateheure = value;
    }

    get etat() {
        return this.#etat;
    }

    set etat(value) {
        this.#etat = value;
    }

    get client() {
        return this.#client;
    }

    set client(value) {
        this.#client = value;
    }

    get rdv() {
        return this.#rdv;
    }

    set rdv(value) {
        this.#rdv = value;
    }
}