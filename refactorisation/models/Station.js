import {Voiture} from "./Voiture.js";
import {ObjectId} from "mongodb";

export class Station{
    static #table="stations";

    static get table() {
        return this.#table;
    }

    #idstation;
    #nom;
    #lieu;
    #coordonnees;

    get idstation() {
        return this.#idstation;
    }

    set idstation(value) {
        this.#idstation = value;
    }

    get nom() {
        return this.#nom;
    }

    set nom(value) {
        this.#nom = value;
    }

    get lieu() {
        return this.#lieu;
    }

    set lieu(value) {
        this.#lieu = value;
    }

    get coordonnees() {
        return this.#coordonnees;
    }

    set coordonnees(value) {
        this.#coordonnees = value;
    }
    static async getAllStations(connection,sess,config,page,limit){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const pageNumber=Number(page);
            const limitNumber=Number(limit);
            const collection=connection.db().collection(Station.table);
            const stations=await collection.find({etat:Number(config.ETAT_STATION_CREE)},{session})
                .skip((pageNumber-1)*limitNumber)
                .limit(limitNumber)
                .toArray();
            return stations;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    static async countStations(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Station.table);
            const countStations=await collection.countDocuments({etat:Number(config.ETAT_STATION_CREE)},{session});
            return countStations;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
    async getStation(connection,sess,config){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const collection=connection.db().collection(Station.table);
            const station=await collection.findOne({_id:new ObjectId(this.idstation),etat:Number(config.ETAT_STATION_CREE)},{session});
            return station;
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }

    static async paginationStation(connection,sess,config,page,limit){
        let session=sess;
        let openedSession=false;
        if(sess===null){
            session=connection.startSession();
            openedSession=true;
        }
        try{
            const stations=await this.getAllStations(connection,session,config,page,limit);
            const countStations=await this.countStations(connection,session,config);
            return [stations,countStations];
        }finally{
            if(openedSession){
                await session.endSession();
            }
        }
    }
}