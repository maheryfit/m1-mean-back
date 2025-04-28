export class Manager {
    static #table="managers";

    static get table() {
        return this.#table;
    }
    #idmanager;
    #nom;
    #prenom;
    #telephone;
    #etat;

    get idmanager() {
        return this.#idmanager;
    }

    set idmanager(value) {
        this.#idmanager = value;
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
}