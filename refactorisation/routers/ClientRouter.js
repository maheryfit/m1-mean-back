import express from "express";
import {Client} from "../models/Client.js";

const clientRouter=express.Router();

clientRouter.post("/inscription", async (req, res)=>{
    /*
    * utilisateur: {
    *   nom,
    *   prenom,
    *   nomUtilisateur,
    *   motDePasse,
    *   telephone
    * }
    * */
    try{
        const utilisateur=req.body;
        const client=new Client(utilisateur);
        await client.inscription(req.myConnection,null,req.config);
        res.status(200).send({message:"Inscription réussie"});
    }catch(error) {
        console.log(error);
        res.status(500).send({message:error.message});
    }
});
clientRouter.post("/connexion", async (req, res)=>{
    /*
    * utilisateur: {
    *   nomUtilisateur,
    *   motDePasse,
    *   profil
    * }
    * */
    try{
        const utilisateur=req.body;
        let client=new Client(utilisateur);
        client=await client.connexion(req.myConnection,null);
        const token=await req.tokenUtil.generateToken(client);
        res.cookie(req.config.COOKIE_KEY,token,req.config.COOKIE_CONFIG);
        res.status(200).send(client);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});

export default clientRouter;