const express = require('express');
const router = express.Router();

const ClientService = require('../../services/dashboard-client/clientService');
const ClientController = require('../../controllers/dashboard-client/clientController');

const service = new ClientService();
const middleware = require('../..//middlewares/authentificationMiddleware');
const clientController = new ClientController(service);

router.get('', middleware.authenticateTokenManager,clientController.getAll.bind(clientController));
router.get('/:id', middleware.authenticateTokenManager,clientController.findById.bind(clientController));
router.post('', middleware.authenticateTokenManager,clientController.create.bind(clientController));
router.put('/:id', middleware.authenticateTokenManager,clientController.update.bind(clientController));
router.delete('/:id', middleware.authenticateTokenManager,clientController.delete.bind(clientController));

module.exports = router;
