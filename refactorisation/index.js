import express from "express";

import bodyParser from "body-parser";

import clientRouter from "./routers/ClientRouter.js";
import {ToolingMiddleware} from "./middlewares/ToolingMiddleware.js";
import {MongoClient} from "mongodb";
import {TokenUtil} from "./utils/TokenUtil.js";
import {Constantes} from "./utils/Constantes.js";
import cookieParser from "cookie-parser";
import utilisateurRouter from "./routers/UtilisateurRouter.js";

const app=express();
const port=Number(process.env.PORT);

const config=new Constantes();

const secret=process.env.JWT_SECRET_KEY;
const algorithm=process.env.JWT_ALGORITHM;
const expiration=process.env.TOKEN_DURATION;
const tokenUtil=new TokenUtil(secret,algorithm,expiration);

const url=process.env.MONGO_URI;
const connection=new MongoClient(url);
await connection.connect();

app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use([
    ToolingMiddleware.passConnection(connection),
    ToolingMiddleware.passTokenUtil(tokenUtil),
    ToolingMiddleware.passConfig(config)
]);
app.use("/client", clientRouter);
app.use("/utilisateur", utilisateurRouter);

app.listen(port);