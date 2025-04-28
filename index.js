import express from "express";

import bodyParser from "body-parser";

import clientRouter from "./routers/ClientRouter.js";
import {ToolingMiddleware} from "./middlewares/ToolingMiddleware.js";
import {MongoClient} from "mongodb";
import {TokenUtil} from "./utils/TokenUtil.js";
import {Constantes} from "./utils/Constantes.js";
import cookieParser from "cookie-parser";
import utilisateurRouter from "./routers/UtilisateurRouter.js";
import stationRouter from "./routers/StationRouter.js";
import serviceRouter from "./routers/ServiceRouter.js";
import mecanicienRouter from "./routers/MecanicienRouter.js";

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

const corsOrigin=process.env.CORS_ORIGIN;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", corsOrigin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use([
    ToolingMiddleware.passConnection(connection),
    ToolingMiddleware.passTokenUtil(tokenUtil),
    ToolingMiddleware.passConfig(config)
]);
app.use("/client", clientRouter);
app.use("/mecanicien", mecanicienRouter);
app.use("/utilisateur", utilisateurRouter);
app.use("/station", stationRouter);
app.use("/service", serviceRouter);

app.listen(port);