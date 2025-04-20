import {StatutClient} from "../models/StatutClient.js";
import {MongoClient} from "mongodb";

const connection=new MongoClient("");
await connection.connect();
const session=connection.startSession();
try{
    const statutCollection=connection.db().collection(StatutClient.table);
    await session.withTransaction(async()=>{
        await statutCollection.insertMany([
            { _id:1, nom:"a" },
            { _id:2, nom:"aa" }
        ],{session});
    });
}finally{
    await session.endSession();
    await connection.close();
}