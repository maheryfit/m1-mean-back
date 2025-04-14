const express = require('express');
const router = express.Router();

const ServiceService = require('../../services/dashboard-mecanicien/serviceService');
const ServiceController = require('../../controllers/dashboard-mecanicien/serviceController');

const service = new ServiceService();
const middleware = require('../../middlewares/authentificationMiddleware');
const serviceController = new ServiceController(service);

router.get('/:index/:pagelimit', middleware.authenticateToken,serviceController.getAllPaginate.bind(serviceController));
router.get('/count', middleware.authenticateToken,serviceController.count.bind(serviceController));
router.get('/', middleware.authenticateToken,serviceController.getAll.bind(serviceController));
router.get('/:id', middleware.authenticateToken,serviceController.findById.bind(serviceController));
router.post('/', middleware.authenticateTokenManager,serviceController.create.bind(serviceController));
router.put('/:id', middleware.authenticateTokenManager,serviceController.update.bind(serviceController));
router.delete('/:id', middleware.authenticateTokenManager,serviceController.delete.bind(serviceController));
router.post('/insertMany', middleware.authenticateTokenManager,serviceController.insertMany.bind(serviceController));

module.exports = router;
