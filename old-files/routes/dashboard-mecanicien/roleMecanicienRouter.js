const express = require('express');
const router = express.Router();

const RoleMecanicienService = require('../../services/dashboard-mecanicien/roleMecanicienService');
const RoleMecanicienController = require('../../controllers/dashboard-mecanicien/roleMecanicienController');

const service = new RoleMecanicienService();
const middleware = require('../../middlewares/authentificationMiddleware');
const roleMecanicienController = new RoleMecanicienController(service);

router.get('/', middleware.authenticateTokenMecanicienAndManager,roleMecanicienController.getAll.bind(roleMecanicienController));
router.get('/:id', middleware.authenticateTokenMecanicienAndManager,roleMecanicienController.findById.bind(roleMecanicienController));
router.post('/', middleware.authenticateTokenManager,roleMecanicienController.create.bind(roleMecanicienController));
router.put('/:id', middleware.authenticateTokenManager,roleMecanicienController.update.bind(roleMecanicienController));
router.delete('/:id', middleware.authenticateTokenManager,roleMecanicienController.delete.bind(roleMecanicienController));

module.exports = router;
