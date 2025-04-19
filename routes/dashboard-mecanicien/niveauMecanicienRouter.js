const express = require('express');
const router = express.Router();

const NiveauMecanicienService = require('../../services/dashboard-mecanicien/niveauMecanicienService');
const NiveauMecanicienController = require('../../controllers/dashboard-mecanicien/niveauMecanicienController');

const service = new NiveauMecanicienService();
const middleware = require('../../middlewares/authentificationMiddleware');
const niveauMecanicienController = new NiveauMecanicienController(service);

router.get('/:index/:pagelimit', middleware.authenticateToken,niveauMecanicienController.getAllPaginate.bind(niveauMecanicienController));
router.get('/count', middleware.authenticateToken,niveauMecanicienController.count.bind(niveauMecanicienController));
router.get('/', middleware.authenticateTokenMecanicienAndManager,niveauMecanicienController.getAll.bind(niveauMecanicienController));
router.get('/:id', middleware.authenticateTokenMecanicienAndManager,niveauMecanicienController.findById.bind(niveauMecanicienController));
router.post('/', middleware.authenticateTokenManager,niveauMecanicienController.create.bind(niveauMecanicienController));
router.put('/:id', middleware.authenticateTokenManager,niveauMecanicienController.update.bind(niveauMecanicienController));
router.delete('/:id', middleware.authenticateTokenManager,niveauMecanicienController.delete.bind(niveauMecanicienController));

module.exports = router;
