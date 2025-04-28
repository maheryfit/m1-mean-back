export class Niveau{
    static #table="niveaux";

    static get table() {
        return this.#table;
    }
    #idniveau;
    #nom;
    #coefficient_salarial;

    get idniveau() {
        return this.#idniveau;
    }

    set idniveau(value) {
        this.#idniveau = value;
    }

    get nom() {
        return this.#nom;
    }

    set nom(value) {
        this.#nom = value;
    }

    get coefficient_salarial() {
        return this.#coefficient_salarial;
    }

    set coefficient_salarial(value) {
        this.#coefficient_salarial = value;
    }
}