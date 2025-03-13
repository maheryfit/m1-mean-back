const express = require('express');
const router = express.Router();

const StatutClientService = require('../../services/dashboard-client/statutClientService');
const StatutClientController = require('../../controllers/dashboard-client/statutClientController');

const service = new StatutClientService();
const middleware = require('../..//middlewares/authentificationMiddleware');
const statutClientController = new StatutClientController(service);

router.get('', middleware.authenticateTokenManager,statutClientController.getAll.bind(statutClientController));
router.get('/:id', middleware.authenticateTokenManager,statutClientController.findById.bind(statutClientController));
router.post('', middleware.authenticateTokenManager,statutClientController.create.bind(statutClientController));
router.put('/:id', middleware.authenticateTokenManager,statutClientController.update.bind(statutClientController));
router.delete('/:id', middleware.authenticateTokenManager,statutClientController.delete.bind(statutClientController));

module.exports = router;
