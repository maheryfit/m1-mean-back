import express from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import {Station} from "../models/Station.js";

const stationRouter=express.Router();

stationRouter.get("/liste-station/:page/:limit", AuthMiddleware.checkConnecte, async (req,res)=>{
    try{
        const stations=await Station.paginationStation(req.myConnection,null,req.config,req.params.page,req.params.limit);
        res.status(200).send(stations);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});


stationRouter.get("/", AuthMiddleware.checkConnecte, async (req,res)=>{
    try{
        const stations=await Station.getAll(req.myConnection,null,req.config);
        res.status(200).send(stations);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});

export default stationRouter;
