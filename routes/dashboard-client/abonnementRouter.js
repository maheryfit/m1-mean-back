const express = require('express');
const router = express.Router();

const AbonnementService = require('../../services/dashboard-client/abonnementService');
const AbonnementController = require('../../controllers/dashboard-client/abonnementController');

const service = new AbonnementService();
const middleware = require('../..//middlewares/authentificationMiddleware');
const abonnementController = new AbonnementController(service);

router.get('', middleware.authenticateTokenManager,abonnementController.getAll.bind(abonnementController));
router.get('/:id', middleware.authenticateTokenManager,abonnementController.findById.bind(abonnementController));
router.post('', middleware.authenticateTokenManager,abonnementController.create.bind(abonnementController));
router.put('/:id', middleware.authenticateTokenManager,abonnementController.update.bind(abonnementController));
router.delete('/:id', middleware.authenticateTokenManager,abonnementController.delete.bind(abonnementController));

module.exports = router;
