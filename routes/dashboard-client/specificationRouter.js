const express = require('express');
const router = express.Router();

const SpecificationService = require('../../services/dashboard-client/specificationService');
const SpecificationController = require('../../controllers/dashboard-client/specificationController');

const service = new SpecificationService();
const middleware = require('../..//middlewares/authentificationMiddleware');
const specificationController = new SpecificationController(service);

router.get('', middleware.authenticateTokenManager,specificationController.getAll.bind(specificationController));
router.get('/:id', middleware.authenticateTokenManager,specificationController.findById.bind(specificationController));
router.post('', middleware.authenticateTokenManager,specificationController.create.bind(specificationController));
router.put('/:id', middleware.authenticateTokenManager,specificationController.update.bind(specificationController));
router.delete('/:id', middleware.authenticateTokenManager,specificationController.delete.bind(specificationController));

module.exports = router;
