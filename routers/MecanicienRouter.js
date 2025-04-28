import express from "express";
import {Client} from "../models/Client.js";
import {Mecanicien} from "../models/Mecanicien.js";

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

export default mecanicienRouter;