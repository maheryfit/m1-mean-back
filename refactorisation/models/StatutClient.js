export class StatutClient{
    static #table="statut_clients";

    static get table() {
        return this.#table;
    }

    #nom;

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