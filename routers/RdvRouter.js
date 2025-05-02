import express from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import {Rdv} from "../models/Rdv.js";

const rdvRouter=express.Router();
rdvRouter.get("/liste-paiements/:idrdv/:page/:limit",AuthMiddleware.checkConnecte,async (req, res) => {
    try{
        const rdv=new Rdv();
        rdv.idrdv=req.params.idrdv;
        const paginationRdv=await rdv.paginationPaiements(req.myConnection,null,req.config,req.params.page,req.params.limit);
        res.status(200).send(paginationRdv);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});

export default rdvRouter;