import express from "express";
import {Client} from "../models/Client.js";
import {Mecanicien} from "../models/Mecanicien.js";
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import {Rdv} from "../models/Rdv.js";
import {Service} from "../models/Service.js";
import serviceRouter from "./ServiceRouter.js";

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
mecanicienRouter.get("/details-rdv/:idrdv", AuthMiddleware.checkAuthMecanicien, async (req, res) => {
    try{
        let rdv=new Rdv();
        rdv.idrdv=req.params.idrdv;
        rdv=await rdv.getRdvEnCours(req.myConnection,null,req.config);
        res.status(200).send(rdv);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});
mecanicienRouter.put("/ajouter-diagnostic/:idrdv", AuthMiddleware.checkAuthMecanicien, async (req, res) => {
    /*
    * diagnostic:{
    *   evaluation,
    *   dateheure
    * }
    * */
    try{
        const diagnostic=req.body;
        const utilisateur=req.utilisateur;
        const mecanicien=new Mecanicien({});
        mecanicien.idmecanicien=utilisateur.idmecanicien;
        mecanicien.nomUtilisateur=utilisateur.nom_utilisateur;
        const rdv=new Rdv();
        rdv.idrdv=req.params.idrdv;
        await mecanicien.ajouterDiagnostic(req.myConnection,null,req.config,rdv,diagnostic);
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});
mecanicienRouter.put("/prendre-charge-rdv/:idrdv", AuthMiddleware.checkAuthMecanicien, async (req, res) => {
    try{
        const utilisateur=req.utilisateur;
        let mecanicien=new Mecanicien({});
        mecanicien.idmecanicien=utilisateur.idmecanicien;
        const rdv=new Rdv();
        rdv.idrdv=req.params.idrdv;
        mecanicien= await mecanicien.prendreRdvEnCharge(req.myConnection,null,req.config,rdv);
        res.status(200).send(mecanicien);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});
mecanicienRouter.put("/cloturer-rdv/:idrdv", AuthMiddleware.checkAuthMecanicien, async (req, res) => {
    try{
        const utilisateur=req.utilisateur;
        const mecanicien=new Mecanicien({});
        mecanicien.idmecanicien=utilisateur.idmecanicien;
        const rdv=new Rdv();
        rdv.idrdv=req.params.idrdv;
        await mecanicien.cloturerRdv(req.myConnection,null,req.config,rdv);
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
})
mecanicienRouter.get("/count", AuthMiddleware.checkConnecte, async (req,res)=>{
    try {
        const count = await Mecanicien.countMecaniciens(req.myConnection, null, req.config);
        res.status(200).json(count);
    } catch (error) {
        res.status(500).send({message:error.message});
    }
})

mecanicienRouter.get("/:page/:limit", AuthMiddleware.checkConnecte, async (req,res)=>{
    try {
        const services = await Mecanicien.getAll(req.myConnection, null, req.config, req.params.page, req.params.limit);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).send({message:error.message});
    }
})
export default mecanicienRouter;
