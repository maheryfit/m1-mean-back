import express from "express";
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import {Service} from "../models/Service.js";

const serviceRouter=express.Router();

serviceRouter.get("/liste-service/:page/:limit", AuthMiddleware.checkConnecte, async (req,res)=>{
   try{
       const paginationService=await Service.paginationServices(
           req.myConnection,
           null,
           req.config,
           req.params.page,
           req.params.limit
       );
       res.status(200).json(paginationService);
   } catch(error){
       console.error(error);
       res.status(500).send({message:error.message});
   }
});

export default serviceRouter;