const middleware = require("../../middlewares/authentificationMiddleware");
const DiagnosticService = require("../../services/dashboard-mecanicien/diagnosticService");
const DiagnosticController = require("../../controllers/dashboard-mecanicien/diagnosticController");
const express = require("express");

const router=express.Router();

const diagnosticService=new DiagnosticService();
const diagnosticController=new DiagnosticController(diagnosticService);

router.post("/", middleware.authenticateTokenMecanicienAndManager, diagnosticController.create.bind(diagnosticController));
router.put("/:id", middleware.authenticateToken, diagnosticController.update.bind(diagnosticController));
router.get("/effectuer", middleware.authenticateToken, diagnosticController.findAllEffectuer.bind(diagnosticController));
router.get("/annuler", middleware.authenticateToken, diagnosticController.findAllAnnuler.bind(diagnosticController));
router.delete("/:id", middleware.authenticateTokenMecanicienAndManager, diagnosticController.delete.bind(diagnosticController));
router.get("/:id", middleware.authenticateToken, diagnosticController.findById.bind(diagnosticController));
router.post('/insertMany', middleware.authenticateTokenManager,diagnosticController.insertMany.bind(diagnosticController));


module.exports = router;
