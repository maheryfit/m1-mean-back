export class Service{
    static #table="services";

    static get table() {
        return this.#table;
    }

    #idservice;
    #nom;
    #tarif;
    #duree;
    #etat;

    get idservice() {
        return this.#idservice;
    }

    set idservice(value) {
        this.#idservice = value;
    }

    get nom() {
        return this.#nom;
    }

    set nom(value) {
        this.#nom = value;
    }

    get tarif() {
        return this.#tarif;
    }

    set tarif(value) {
        this.#tarif = value;
    }

    get duree() {
        return this.#duree;
    }

    set duree(value) {
        this.#duree = value;
    }

    get etat() {
        return this.#etat;
    }

    set etat(value) {
        this.#etat = value;
    }
    initFromCreerRdv(obj){

    }

    static async getServices(connection, sess, config, page, limit) {
        let session = sess;
        let openedSession = false;
        if (sess === null) {
            session = connection.startSession();
            openedSession = true;
        }
        try {
            const pageNumber=Number(page);
            const limitNumber=Number(limit);
            const collection=connection.db().collection(Service.table);
            return await collection.find({etat: Number(config.ETAT_SERVICE_CREE)}, {session})
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber)
                .toArray();
        } finally {
            if (openedSession) {
                await session.endSession();
            }
        }
    }
    static async countServices(connection, sess, config) {
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Service.table);
            return await collection.countDocuments({etat: Number(config.ETAT_SERVICE_CREE)}, {session});
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    static async paginationServices(connection, sess, config,page, limit) {
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const services=await this.getServices(connection, sess, config,page,limit);
            const countServices=await this.countServices(connection, sess, config);
            return [services,countServices];
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
}
