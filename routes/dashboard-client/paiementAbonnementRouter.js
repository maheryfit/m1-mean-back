const express = require('express');
const router = express.Router();

const PaiementAbonnementService = require('../../services/dashboard-client/paiementAbonnementService');
const PaiementAbonnementController = require('../../controllers/dashboard-client/paiementAbonnementController');

const service = new PaiementAbonnementService();
const middleware = require('../..//middlewares/authentificationMiddleware');
const paiementAbonnementController = new PaiementAbonnementController(service);

router.get('', middleware.authenticateTokenManager,paiementAbonnementController.getAll.bind(paiementAbonnementController));
router.get('/:id', middleware.authenticateTokenManager,paiementAbonnementController.findById.bind(paiementAbonnementController));
router.post('', middleware.authenticateTokenManager,paiementAbonnementController.create.bind(paiementAbonnementController));
router.put('/:id', middleware.authenticateTokenManager,paiementAbonnementController.update.bind(paiementAbonnementController));
router.delete('/:id', middleware.authenticateTokenManager,paiementAbonnementController.delete.bind(paiementAbonnementController));

module.exports = router;
