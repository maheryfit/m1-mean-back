import express from "express";
import {Manager} from "../models/Manager.js";

const managerRouter=express.Router();

managerRouter.post("/connexion", async (req, res) => {
    /*
    * utilisateur: {
    *   nomUtilisateur,
    *   motDePasse,
    *   profil
    * }
    * */
    try{
        const utilisateur=req.body;
        let manager=new Manager(utilisateur);
        manager=await manager.connexion(req.myConnection,null,req.config);
        const token=await req.tokenUtil.generateToken(manager);
        manager.idutilisateur=undefined;
        manager.idmanager=undefined;
        res.cookie(req.config.COOKIE_KEY,token,req.config.COOKIE_CONFIG);
        res.status(200).send(manager);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});
export default managerRouter;
