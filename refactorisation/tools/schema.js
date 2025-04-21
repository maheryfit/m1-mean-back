import {StatutClient} from "../models/StatutClient.js";
import {MongoClient} from "mongodb";
import {Utilisateur} from "../models/Utilisateur.js";
import {Client} from "../models/Client.js";

const connection=new MongoClient("mongodb://localhost:27017/mydb?replicaSet=myReplicaSet");
await connection.connect();
const session=connection.startSession();
try{
    await session.withTransaction(async()=>{
        const statutCollection=connection.db().collection(StatutClient.table);
        const utilisateurCollection=connection.db().collection(Utilisateur.table);

        await utilisateurCollection.createIndex({"nom_utilisateur":1},{unique:true,session});

        await statutCollection.insertMany([
            { _id:1, nom:"a" },
            { _id:2, nom:"aa" }
        ],{session});
    });
}finally{
    await session.endSession();
    await connection.close();
}