const express = require('express');
const router = express.Router();

const SpecificationService = require('../../services/dashboard-client/specificationService');
const SpecificationController = require('../../controllers/dashboard-client/specificationController');

const service = new SpecificationService();
const middleware = require('../..//middlewares/authentificationMiddleware');
const specificationController = new SpecificationController(service);

router.get('/', middleware.authenticateTokenClientAndManager,specificationController.getAll.bind(specificationController));
router.get('/:id', middleware.authenticateTokenClient,specificationController.findById.bind(specificationController));
router.post('/', middleware.authenticateTokenClient,specificationController.create.bind(specificationController));
router.put('/:id', middleware.authenticateTokenClient,specificationController.update.bind(specificationController));
router.delete('/:id', middleware.authenticateTokenClient,specificationController.delete.bind(specificationController));

module.exports = router;
