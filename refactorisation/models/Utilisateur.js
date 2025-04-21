import bcrypt from "bcrypt";
export class Utilisateur{
    static #table="utilisateurs";

    static get table() {
        return this.#table;
    }

    #nomUtilisateur;
    #motDePasse;
    #profil;

    get profil() {
        return this.#profil;
    }

    set profil(value) {
        this.#profil = value;
    }

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
        this.profil=obj.profil;
    }
    toObject(){
        return {
            nomUtilisateur: this.nomUtilisateur,
            motDePasse: this.motDePasse,
        }
    }
    async inscription(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Utilisateur.table);
            if(openedSession) {
                session.startTransaction();
            }
            const motDePasseHash=await bcrypt.hash(this.motDePasse,config.SALT_ROUNDS);
            const utilisateurToInsert={
                nom_utilisateur:this.nomUtilisateur,
                mot_de_passe:motDePasseHash,
                profil:config.PROFIL_CLIENT,
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
    async connexion(connection,sess){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try {
            const collection=connection.db().collection(Utilisateur.table);
            const utilisateur=await collection.findOne({nom_utilisateur:this.nomUtilisateur,profil:this.profil},{session});
            if(utilisateur===null){
                throw new Error("Utilisateur introuvable");
            }
            const correctPassword=await bcrypt.compare(this.motDePasse, utilisateur.mot_de_passe);
            if(!correctPassword){
                throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
            }
            return utilisateur;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
}