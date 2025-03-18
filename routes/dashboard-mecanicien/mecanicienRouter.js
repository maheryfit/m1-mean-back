const express=require("express");
const router=express.Router();
const MecanicienController=require("../../controllers/dashboard-mecanicien/MecanicienController");
const controller=new MecanicienController();
const middleware=require("../../middlewares/authentificationMiddleware");

router.get("/horaire-travail/:id", middleware.authenticateTokenMecanicien, controller.horaireTravail.bind(controller));

module.exports=router;