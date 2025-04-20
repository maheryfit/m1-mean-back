import express from "express";

import bodyParser from "body-parser";

import clientRouter from "./routers/ClientRouter.js";
import {ConnectionPoolMiddleware} from "./middlewares/ConnectionPoolMiddleware.js";
import {MongoClient} from "mongodb";

const app=express();
const port=3000;
const url="mongodb://localhost:27017/mydb?replicaSet=myReplicaSet";

const connection=new MongoClient(url);
await connection.connect();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(ConnectionPoolMiddleware.passConnection(connection));
app.use("/client", clientRouter);

app.listen(port);