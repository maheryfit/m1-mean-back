export class StatutClient{
    static #table="statut_clients";

    static get table() {
        return this.#table;
    }
    #idstatut;
    #nom;
    #pourcentage_reduction;

    get idstatut() {
        return this.#idstatut;
    }

    set idstatut(value) {
        this.#idstatut = value;
    }

    get pourcentage_reduction() {
        return this.#pourcentage_reduction;
    }

    set pourcentage_reduction(value) {
        this.#pourcentage_reduction = value;
    }

    get nom() {
        return this.#nom;
    }

    set nom(value) {
        this.#nom = value;
    }
    constructor(nom) {
        this.nom = nom;
    }
    turnToObject(){
        return {
            nom: this.nom
        }
    }
}