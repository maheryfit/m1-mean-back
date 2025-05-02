const express = require('express');
const router = express.Router();

const MarqueService = require('../../services/dashboard-mecanicien/marqueService');
const MarqueController = require('../../controllers/dashboard-mecanicien/marqueController');

const service = new MarqueService();
const middleware = require('../../middlewares/authentificationMiddleware');
const marqueController = new MarqueController(service);

router.get('/', middleware.authenticateToken,marqueController.getAll.bind(marqueController));
router.get('/:id', middleware.authenticateToken,marqueController.findById.bind(marqueController));
router.post('/', middleware.authenticateTokenManager,marqueController.create.bind(marqueController));
router.post('/insertMany', middleware.authenticateTokenManager,marqueController.insertMany.bind(marqueController));
router.put('/:id', middleware.authenticateTokenManager,marqueController.update.bind(marqueController));
router.delete('/:id', middleware.authenticateTokenManager,marqueController.delete.bind(marqueController));

module.exports = router;
