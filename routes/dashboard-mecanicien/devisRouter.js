const middleware = require("../../middlewares/authentificationMiddleware");
const DevisService = require("../../services/dashboard-mecanicien/DevisService");
const DevisController = require("../../controllers/dashboard-mecanicien/DevisController");
const express = require("express");

const router=express.Router();

const devisService=new DevisService();
const devisController=new DevisController(devisService);

router.get("/par-demande-rdv/:iddemande", middleware.authenticateToken, devisController.findByIdDemande.bind(devisController));
router.get("/:station/station", middleware.authenticateToken, devisController.getAllServiceByStation.bind(devisController));
router.get("/payer", middleware.authenticateToken, devisController.getDevisPayer.bind(devisController));
router.get("/creer", middleware.authenticateToken, devisController.getDevisCreer.bind(devisController));
router.get("/annuler", middleware.authenticateToken, devisController.getDevisAnnuler.bind(devisController));
router.get("/:id", middleware.authenticateToken, devisController.findById.bind(devisController));
router.post("/", middleware.authenticateTokenMecanicienAndManager, devisController.create.bind(devisController));
router.put("/:id", middleware.authenticateToken, devisController.update.bind(devisController));
router.put("/annuler/:id", middleware.authenticateTokenClient, devisController.annuler.bind(devisController));
router.delete("/:id", middleware.authenticateTokenMecanicienAndManager, devisController.delete.bind(devisController));


module.exports = router;
