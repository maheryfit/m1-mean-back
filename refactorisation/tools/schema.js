import {MongoClient} from "mongodb";
import {Utilisateur} from "../models/Utilisateur.js";
import {Voiture} from "../models/Voiture.js";

const connection=new MongoClient("mongodb://localhost:27017/mydb?replicaSet=myReplicaSet");
await connection.connect();
const session=connection.startSession();
try{
    await session.withTransaction(async()=>{
        const utilisateurCollection=connection.db().collection(Utilisateur.table);
        const voitureCollection=connection.db().collection(Voiture.table);
        await utilisateurCollection.createIndex({nom_utilisateur:1,profil:1},{unique:true,session});
        await voitureCollection.createIndex({description:1,immatriculation:1},{unique:true,session});
    });
}finally{
    await session.endSession();
    await connection.close();
}