import express from "express";
import {Client} from "../models/Client.js";
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import {Voiture} from "../models/Voiture.js";
import {Station} from "../models/Station.js";

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
        client=await client.connexion(req.myConnection,null,req.config);
        const token=await req.tokenUtil.generateToken(client);
        client.idutilisateur=undefined;
        client.idclient=undefined;
        res.cookie(req.config.COOKIE_KEY,token,req.config.COOKIE_CONFIG);
        res.status(200).send(client);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});
clientRouter.get("/liste-voiture/:page/:limit", AuthMiddleware.checkAuthClient, async (req, res)=>{
    /*
    * cookieKey : <cookie>
    * */
    try{
        const utilisateur=req.utilisateur;
        const client=new Client({});
        client.idclient=utilisateur.idclient;
        const voitures=await client.paginationVoiture(req.myConnection,null,req.config,req.params.page,req.params.limit);
        res.status(200).send(voitures);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});
clientRouter.post("/creer-voiture", AuthMiddleware.checkAuthClient, async (req, res)=>{
    /*
    * voiture:{
    *   description,
    *   immatriculation,
    *   caracteristiques
    * }
    * */
    try{
        const utilisateur=req.utilisateur;
        const client=new Client({});
        client.idclient=utilisateur.idclient;
        let voiture=req.body;
        voiture=await client.creerVoiture(req.myConnection,null,req.config,voiture);
        res.status(200).send(voiture);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
})
clientRouter.delete("/supprimer-voiture/:idvoiture", AuthMiddleware.checkAuthClient, async (req, res)=>{
    try{
        const utilisateur=req.utilisateur;
        const client=new Client({});
        client.idclient=utilisateur.idclient;
        await client.supprimerVoiture(req.myConnection,null,req.config,req.params.idvoiture);
        res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
})
clientRouter.get("/interface-creer-rdv/:idstation", AuthMiddleware.checkAuthClient, async (req, res)=>{
    try{
        const utilisateur=req.utilisateur;
        const client=new Client({});
        client.idclient=utilisateur.idclient;
        const station=new Station();
        station.idstation=req.params.idstation;
        const objCreationRdv=await client.interfaceCreationRdv(req.myConnection,null,req.config,station);
        res.status(200).send(objCreationRdv);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});
clientRouter.post("/creer-rdv", AuthMiddleware.checkAuthClient, async (req, res)=>{
    /*
    * rdv: {
    *   description,
    *   dateheure,
    *   voiture:{
    *       private _idvoiture:string="";
            private _description:string="";
            private _immatriculation:string="";
            private _caracteristiques:{ _nom, _valeur };
    *   },
    *   services:[
    *       {
    *           _idstation,
    *           _nom,
    *           _tarif,
    *           _duree
    *       }
    *   ],
    *   duree,
    *   montant,
    *   reste_a_payer,
    *   remises:[{nom, pourcentage}],
    *   station:{
    *       _idstation, _nom, _lieu, _coordonnees:{ type, coordonnees: [] }
    *   }
    * */
    try{
        let rdv=req.body;
        const utilisateur=req.utilisateur;
        const client=new Client({});
        client.idclient=utilisateur.idclient;
        rdv=await client.creerRdv(req.myConnection,null,req.config,rdv);
        res.status(200).send(rdv);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
});
clientRouter.get("/liste-rdv/:page/:limit", AuthMiddleware.checkAuthClient, async (req, res)=>{
    try{
        const utilisateur=req.utilisateur;
        const client=new Client({});
        client.idclient=utilisateur.idclient;
        const rdvs=await client.paginationListeRdv(req.myConnection,null,req.config,req.params.page,req.params.limit);
        res.status(200).send(rdvs);
    }catch(error){
        console.log(error);
        res.status(500).send({message:error.message});
    }
})

export default clientRouter;