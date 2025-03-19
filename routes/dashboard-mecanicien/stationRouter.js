const express = require('express');
const router = express.Router();

const StationService = require('../../services/dashboard-mecanicien/StationService');
const StationController = require('../../controllers/dashboard-mecanicien/StationController');

const service = new StationService();
const middleware = require('../../middlewares/authentificationMiddleware');
const stationController = new StationController(service);

router.get('', middleware.authenticateToken,stationController.getAll.bind(stationController));
router.get('/:id', middleware.authenticateToken,stationController.findById.bind(stationController));
router.post('', middleware.authenticateTokenManager,stationController.create.bind(stationController));
router.put('/:id', middleware.authenticateTokenManager,stationController.update.bind(stationController));
router.delete('/:id', middleware.authenticateTokenManager,stationController.delete.bind(stationController));

module.exports = router;
