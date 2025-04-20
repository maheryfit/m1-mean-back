import {Constantes} from "../utils/Constantes.js";
import bcrypt from "bcrypt";

export class Utilisateur{
    static #table="utilisateurs";
    #nomUtilisateur;
    #motDePasse;

    get nomUtilisateur() {
        return this.#nomUtilisateur;
    }

    set nomUtilisateur(value) {
        this.#nomUtilisateur = value;
    }

    get motDePasse() {
        return this.#motDePasse;
    }

    set motDePasse(value) {
        this.#motDePasse = value;
    }
    constructor(obj) {
        this.nomUtilisateur = obj.nomUtilisateur;
        this.motDePasse = obj.motDePasse;
    }
    toObject(){
        return {
            nomUtilisateur: this.nomUtilisateur,
            motDePasse: this.motDePasse,
        }
    }
    async inscription(connection,sess){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Utilisateur.#table);
            if(openedSession) {
                session.startTransaction();
            }
            const motDePasseHash=await bcrypt.hash(this.motDePasse,Constantes.SALT_ROUNDS);
            const utilisateurToInsert={
                nom_utilisateur:this.nomUtilisateur,
                mot_de_passe:motDePasseHash,
            }
            await collection.insertOne(utilisateurToInsert,{session});
            if(openedSession){
                await session.commitTransaction();
            }
            return utilisateurToInsert;
        }catch(error){
            if(openedSession){
                await session.abortTransaction();
            }
            console.log(error);
            throw error;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
}