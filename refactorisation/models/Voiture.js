export class Voiture{
    static #table="voitures";

    static get table() {
        return this.#table;
    }

    #description;
    #immatriculation;

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get immatriculation() {
        return this.#immatriculation;
    }

    set immatriculation(value) {
        this.#immatriculation = value;
    }

    constructor(obj) {
        this.description = obj.description;
        this.immatriculation = obj.immatriculation;
    }
}