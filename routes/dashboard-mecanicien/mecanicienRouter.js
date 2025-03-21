const express=require("express");
const router=express.Router();
const MecanicienController=require("../../controllers/dashboard-mecanicien/MecanicienController");
const controller=new MecanicienController();

const DemandeRDVDiagnosticService = require('../../services/dashboard-client/demandeRDVDiagnosticService');
const DemandeRDVDiagnosticController = require('../../controllers/dashboard-client/demandeRDVDiagnosticController');
const service = new DemandeRDVDiagnosticService();
const middleware = require('../../middlewares/authentificationMiddleware');
const demandeRDVDiagnosticController = new DemandeRDVDiagnosticController(service);

router.get("/horaire-travail/:id", middleware.authenticateTokenMecanicien, controller.horaireTravail.bind(controller));
router.get("/demandes-rdv-en-cours", middleware.authenticateTokenMecanicien, demandeRDVDiagnosticController.demandesRdvEnCours.bind(demandeRDVDiagnosticController));
router.put("/action-demande-rdv/:id", middleware.authenticateTokenMecanicien, demandeRDVDiagnosticController.actionDemandeRdv.bind(demandeRDVDiagnosticController));
router.post("/ajout-diagnostic/:idrdv", middleware.authenticateTokenMecanicien, demandeRDVDiagnosticController.ajoutDiagnostic.bind(demandeRDVDiagnosticController));

module.exports=router;