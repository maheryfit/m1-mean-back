import express from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import {Station} from "../models/Station.js";

const stationRouter=express.Router();

stationRouter.get("/:page/:limit", AuthMiddleware.checkConnecte, async (req,res)=>{
    try{
        const stations=await Station.getAllStations(req.myConnection,null,req.config,req.params.page,req.params.limit);
        res.status(200).send(stations);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
})
stationRouter.get("/count", AuthMiddleware.checkConnecte, async (req,res)=>{
   try{
       const countStations=await Station.countStations(req.myConnection,null,req.config);
       res.status(200).send(countStations);
   } catch(error){
       console.log(error);
       res.status(500).send({message:error.message});
   }
});

export default stationRouter;