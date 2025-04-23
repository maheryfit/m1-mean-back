export class Voiture{
    static #table="voitures";

    static get table() {
        return this.#table;
    }

    #idvoiture;
    #description;
    #immatriculation;
    #caracteristiques;
    #etat;

    get idvoiture() {
        return this.#idvoiture;
    }

    set idvoiture(value) {
        this.#idvoiture = value;
    }

    get etat() {
        return this.#etat;
    }

    set etat(value) {
        this.#etat = value;
    }

    get caracteristiques() {
        return this.#caracteristiques;
    }

    set caracteristiques(value) {
        this.#caracteristiques = value;
    }

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
        this.idvoiture=obj.idvoiture;
        this.description = obj.description;
        this.immatriculation = obj.immatriculation;
        this.caracteristiques = obj.caracteristiques;
    }
}