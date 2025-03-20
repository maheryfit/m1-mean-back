const express = require('express');
const router = express.Router();

const PaiementAbonnementService = require('../../services/dashboard-client/paiementAbonnementService');
const PaiementAbonnementController = require('../../controllers/dashboard-client/paiementAbonnementController');

const service = new PaiementAbonnementService();
const middleware = require('../../middlewares/authentificationMiddleware');
const paiementAbonnementController = new PaiementAbonnementController(service);

router.get('', middleware.authenticateTokenClient,paiementAbonnementController.getAll.bind(paiementAbonnementController));
router.get('/:id', middleware.authenticateTokenClient,paiementAbonnementController.findById.bind(paiementAbonnementController));
router.post('', middleware.authenticateTokenClient,paiementAbonnementController.create.bind(paiementAbonnementController));
router.delete('/:id', middleware.authenticateTokenClient,paiementAbonnementController.delete.bind(paiementAbonnementController));

module.exports = router;
