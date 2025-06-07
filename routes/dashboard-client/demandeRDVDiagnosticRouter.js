const express = require('express');
const router = express.Router();

const DemandeRDVDiagnosticService = require('../../services/dashboard-client/demandeRDVDiagnosticService');
const DemandeRDVDiagnosticController = require('../../controllers/dashboard-client/demandeRDVDiagnosticController');

const service = new DemandeRDVDiagnosticService();
const middleware = require('../../middlewares/authentificationMiddleware');
const demandeRDVDiagnosticController = new DemandeRDVDiagnosticController(service);

router.get('/mecanicien/:id', middleware.authenticateToken,demandeRDVDiagnosticController.findByIdMecanicien.bind(demandeRDVDiagnosticController));
router.get('/:index/:pagelimit', middleware.authenticateToken,demandeRDVDiagnosticController.getAllPaginate.bind(demandeRDVDiagnosticController));
router.get('/count', middleware.authenticateToken,demandeRDVDiagnosticController.count.bind(demandeRDVDiagnosticController));
router.get("/demandes-rdv-en-cours", middleware.authenticateToken, demandeRDVDiagnosticController.demandesRdvEnCours.bind(demandeRDVDiagnosticController));
router.get("/demandes-rdv-en-accepter", middleware.authenticateToken, demandeRDVDiagnosticController.demandesRdvAccepter.bind(demandeRDVDiagnosticController));
router.get("/demandes-rdv-en-rejeter", middleware.authenticateToken, demandeRDVDiagnosticController.demandesRdvRejeter.bind(demandeRDVDiagnosticController));
router.get('/', middleware.authenticateToken,demandeRDVDiagnosticController.getAll.bind(demandeRDVDiagnosticController));
router.get('/:id', middleware.authenticateToken,demandeRDVDiagnosticController.findById.bind(demandeRDVDiagnosticController));
router.post("/ajout-diagnostic/:idrdv", middleware.authenticateTokenMecanicien, demandeRDVDiagnosticController.ajoutDiagnostic.bind(demandeRDVDiagnosticController));
router.post('/many', middleware.authenticateTokenManager,demandeRDVDiagnosticController.createMany.bind(demandeRDVDiagnosticController));
router.post('/', middleware.authenticateToken,demandeRDVDiagnosticController.create.bind(demandeRDVDiagnosticController));
router.put("/action-demande-rdv/:id", middleware.authenticateTokenMecanicien, demandeRDVDiagnosticController.actionDemandeRdv.bind(demandeRDVDiagnosticController));
router.put('/:id', middleware.authenticateToken,demandeRDVDiagnosticController.update.bind(demandeRDVDiagnosticController));
router.delete('/:id', middleware.authenticateToken,demandeRDVDiagnosticController.delete.bind(demandeRDVDiagnosticController));

module.exports = router;
