export class Abonnement {
    static #table="abonnements";

    static get table() {
        return this.#table;
    }

    #idabonnement;
    #nom;
    #prix;
    #pourcentage_reduction;

    get pourcentage_reduction() {
        return this.#pourcentage_reduction;
    }

    set pourcentage_reduction(value) {
        this.#pourcentage_reduction = value;
    }

    get idabonnement() {
        return this.#idabonnement;
    }

    set idabonnement(value) {
        this.#idabonnement = value;
    }

    get nom() {
        return this.#nom;
    }

    set nom(value) {
        this.#nom = value;
    }

    get prix() {
        return this.#prix;
    }

    set prix(value) {
        this.#prix = value;
    }
}