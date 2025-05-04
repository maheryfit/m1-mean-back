import express from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import {Abonnement} from "../models/Abonnement.js";

const abonnementRouter=express.Router();

abonnementRouter.get("/liste-abonnements", AuthMiddleware.checkConnecte, async (req,res)=>{
    try{
        const abonnements=await Abonnement.getAbonnements(req.myConnection,null,req.config);
        res.status(200).send(abonnements);
    }catch(err){
        console.log(err);
        res.status(500).send({message:err.message});
    }
})

export default abonnementRouter;