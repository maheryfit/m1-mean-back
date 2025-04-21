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
        console.log(utilisateur);
        const client=new Client(utilisateur);
        await client.inscription(req.myConnection,null);
        res.status(200).send({message:"Inscription réussie"});
    }catch(error) {
        console.log(error);
        res.status(500).send({message:error.message});
    }
});

export default clientRouter;