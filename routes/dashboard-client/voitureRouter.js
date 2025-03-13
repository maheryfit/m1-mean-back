const express = require('express');
const router = express.Router();

const VoitureService = require('../../services/dashboard-client/voitureService');
const VoitureController = require('../../controllers/dashboard-client/voitureController');

const service = new VoitureService();
const middleware = require('../..//middlewares/authentificationMiddleware');
const voitureController = new VoitureController(service);

router.get('', middleware.authenticateTokenManager,voitureController.getAll.bind(voitureController));
router.get(':id', middleware.authenticateTokenManager,voitureController.findById.bind(voitureController));
router.post('', middleware.authenticateTokenManager,voitureController.create.bind(voitureController));
router.put(':id', middleware.authenticateTokenManager,voitureController.update.bind(voitureController));
router.delete(':id', middleware.authenticateTokenManager,voitureController.delete.bind(voitureController));

module.exports = router;
