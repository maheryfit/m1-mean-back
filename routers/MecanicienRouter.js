import express from "express";
import {Client} from "../models/Client.js";
import {Mecanicien} from "../models/Mecanicien.js";
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";

const mecanicienRouter=express.Router();

mecanicienRouter.post("/connexion", async (req, res) => {
    /*
    * utilisateur: {
    *   nomUtilisateur,
    *   motDePasse,
    *   profil
    * }
    * */
    try{
        const utilisateur=req.body;
        let mecanicien=new Mecanicien(utilisateur);
        mecanicien=await mecanicien.connexion(req.myConnection,null,req.config);
        const token=await req.tokenUtil.generateToken(mecanicien);
        mecanicien.idutilisateur=undefined;
        mecanicien.idmecanicien=undefined;
        res.cookie(req.config.COOKIE_KEY,token,req.config.COOKIE_CONFIG);
        res.status(200).send(mecanicien);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});
mecanicienRouter.get("/liste-rdv/:page/:limit", AuthMiddleware.checkAuthMecanicien, async (req, res) => {
    try{
        const mecanicien=new Mecanicien({});
        const rdvs=await mecanicien.paginationListeRdv(req.myConnection,null,req.config,req.params.page,req.params.limit);
        res.status(200).send(rdvs);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});

export default mecanicienRouter;