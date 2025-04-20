import { MongoClient } from "mongodb";

export class MyConnection{
    static getConnection(){
        const url="mongodb://localhost:27017/mydb?replicaSet=myReplicaSet";
        const connection=new MongoClient(url);
        return connection;
    }
}