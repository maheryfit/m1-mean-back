export class Role {
    static #table="roles";

    static get table() {
        return this.#table;
    }
    #idrole;
    #nom;
    #salaire_mensuel;

    get idrole() {
        return this.#idrole;
    }

    set idrole(value) {
        this.#idrole = value;
    }

    get nom() {
        return this.#nom;
    }

    set nom(value) {
        this.#nom = value;
    }

    get salaire_mensuel() {
        return this.#salaire_mensuel;
    }

    set salaire_mensuel(value) {
        this.#salaire_mensuel = value;
    }
}