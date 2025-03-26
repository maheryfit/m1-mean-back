const middleware = require("../../middlewares/authentificationMiddleware");
const DevisService = require("../../services/dashboard-mecanicien/DevisService");
const DevisController = require("../../controllers/dashboard-mecanicien/DevisController");
const express = require("express");

const router=express.Router();

const devisService=new DevisService();
const devisController=new DevisController(devisService);

router.post("/", middleware.authenticateTokenMecanicien, devisController.create.bind(devisController));
router.put("/:id", middleware.authenticateTokenMecanicien, devisController.update.bind(devisController));
router.put("/payer/:id", middleware.authenticateTokenClient, devisController.payer.bind(devisController));
router.put("/annuler/:id", middleware.authenticateTokenClient, devisController.annuler.bind(devisController));

module.exports = router;
