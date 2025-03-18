const express = require('express');
const router = express.Router();

const DemandeRDVDiagnosticService = require('../../services/dashboard-client/demandeRDVDiagnosticService');
const DemandeRDVDiagnosticController = require('../../controllers/dashboard-client/demandeRDVDiagnosticController');

const service = new DemandeRDVDiagnosticService();
const middleware = require('../../middlewares/authentificationMiddleware');
const demandeRDVDiagnosticController = new DemandeRDVDiagnosticController(service);

router.get('', middleware.authenticateToken,demandeRDVDiagnosticController.getAll.bind(demandeRDVDiagnosticController));
router.get('/:id', middleware.authenticateToken,demandeRDVDiagnosticController.findById.bind(demandeRDVDiagnosticController));
router.post('', middleware.authenticateToken,demandeRDVDiagnosticController.create.bind(demandeRDVDiagnosticController));
router.put('/:id', middleware.authenticateToken,demandeRDVDiagnosticController.update.bind(demandeRDVDiagnosticController));
router.delete('/:id', middleware.authenticateToken,demandeRDVDiagnosticController.delete.bind(demandeRDVDiagnosticController));

module.exports = router;
