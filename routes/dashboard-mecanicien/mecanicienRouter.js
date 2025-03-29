const express=require("express");
const router=express.Router();

const MecanicienService = require('../../services/dashboard-mecanicien/MecanicienService');
const MecanicienController=require("../../controllers/dashboard-mecanicien/MecanicienController");
const service = new MecanicienService()
const controller=new MecanicienController(service);
const middleware = require('../../middlewares/authentificationMiddleware');

router.get("/horaire-travail/:id/:year/:month", middleware.authenticateTokenMecanicienAndManager, controller.horaireTravail.bind(controller));
router.get("/horaire-travail-reel/:id/:year/:month", middleware.authenticateTokenMecanicienAndManager, controller.horaireTravailReel.bind(controller));

router.get('/', middleware.authenticateTokenMecanicienAndManager,controller.getAll.bind(controller));
router.get('/:id', middleware.authenticateTokenMecanicienAndManager,controller.findById.bind(controller));
router.post('/', middleware.authenticateTokenManager,controller.create.bind(controller));
router.put('/:id', middleware.authenticateTokenManager,controller.update.bind(controller));
router.delete('/:id', middleware.authenticateTokenManager,controller.delete.bind(controller));
module.exports=router;
