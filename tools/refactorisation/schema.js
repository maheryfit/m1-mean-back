import {MyConnection} from "../utils/MyConnection.js";

const connection=MyConnection.getConnection();
await connection.connect();
const session=connection.startSession();
try{
    const statutCollection=connection.db().collection("statuts");
    await session.withTransaction(async()=>{
        await statutCollection.insertMany([
            { nom:"simple" },
            { nom:"fidèle" }
        ]);
    });
}finally{
    await session.endSession();
    await connection.close();
}