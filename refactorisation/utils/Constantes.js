import * as process from "node:process";

export class Constantes{
    #SALT_ROUNDS;
    #STATUT_CLIENT_SIMPLE_ID;
    #STATUT_CLIENT_FIDELE_ID;
    #COOKIE_CONFIG;
    #COOKIE_KEY;
    #PROFIL_CLIENT;
    #PROFIL_MECANICIEN;
    #PROFIL_MANAGER;

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

    get STATUT_CLIENT_FIDELE_ID() {
        return this.#STATUT_CLIENT_FIDELE_ID;
    }

    get COOKIE_CONFIG() {
        return this.#COOKIE_CONFIG;
    }


    constructor() {
        this.#SALT_ROUNDS=10;
        this.#STATUT_CLIENT_SIMPLE_ID=1;
        this.#STATUT_CLIENT_FIDELE_ID=2;
        this.#COOKIE_CONFIG= {
            httpOnly: true, // Prevents access from JavaScript
            secure: (process.env.PRODUCTION==="true"), // Works only on HTTPS and HTTP
            sameSite: "Strict", // Prevents CSRF
            maxAge: 2 * 60 * 60 * 1000, // -> 2h // 30 * 24 * 60 * 60 * 1000, // -> 30 days
        }
        this.#COOKIE_KEY=process.env.COOKIE_KEY;
        this.#PROFIL_CLIENT=1;
        this.#PROFIL_MECANICIEN=5;
        this.#PROFIL_MECANICIEN=10;
    }
}