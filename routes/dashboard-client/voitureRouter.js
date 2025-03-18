const express = require('express');
const router = express.Router();

const VoitureService = require('../../services/dashboard-client/voitureService');
const VoitureController = require('../../controllers/dashboard-client/voitureController');

const service = new VoitureService();
const middleware = require('../../middlewares/authentificationMiddleware');
const voitureController = new VoitureController(service);
const multer = require('../../utils/serviceTierceUtil').multer

router.get('', middleware.authenticateToken,voitureController.getAll.bind(voitureController));
router.get('/:id', middleware.authenticateToken,voitureController.findById.bind(voitureController));
router.post('', middleware.authenticateToken, multer.any(), voitureController.create.bind(voitureController));
router.put('/:id', middleware.authenticateToken,voitureController.update.bind(voitureController));
router.delete('/:id', middleware.authenticateToken,voitureController.delete.bind(voitureController));

module.exports = router;
