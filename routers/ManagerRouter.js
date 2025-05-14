import express from "express";
import {Manager} from "../models/Manager.js";

const managerRouter=express.Router();

managerRouter.post("/connexion", async (req, res) => {
    /*
    * utilisateur: {
    *   nomUtilisateur,
    *   motDePasse
    * }
    * */
    try{
        req.body["profil"] = req.config.PROFIL_MANAGER
        const utilisateur=req.body;
        let manager=new Manager(utilisateur);
        manager=await manager.connexion(req.myConnection,null,req.config);
        await sendCookieAndResponse(req,res,manager);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});



managerRouter.post("/inscription", async (req, res) => {
    /*
    * utilisateur: {
    *   nomUtilisateur,
    *   motDePasse,
    *   nom,
    *   prenom
    * }
    * */
    try{
        req.body["profil"] = req.config.PROFIL_MANAGER
        const utilisateur=req.body;
        let manager=new Manager(utilisateur);
        manager=await manager.inscription(req.myConnection,null,req.config);
        await sendCookieAndResponse(req,res,manager);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});


async function sendCookieAndResponse(req, res, manager) {
    const obj = {
        nomUtilisateur: req.body.nomUtilisateur,
        id: manager.id,
        profil: req.config.PROFIL_MANAGER
    }
    const token=await req.tokenUtil.generateToken(obj);
    manager.idutilisateur=undefined;
    manager.idmanager=undefined;
    delete manager.etat
    delete obj.profil
    res.cookie(req.config.COOKIE_KEY,token,req.config.COOKIE_CONFIG);
    res.status(200).send(obj);
}
export default managerRouter;
