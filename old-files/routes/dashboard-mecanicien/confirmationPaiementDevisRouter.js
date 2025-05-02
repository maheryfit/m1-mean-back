const express = require('express');
const router = express.Router();

const ConfirmationPaiementDevisService = require('../../services/dashboard-mecanicien/confirmationPaiementDevisService');
const ConfirmationPaiementDevisController = require('../../controllers/dashboard-mecanicien/confirmationPaiementDevisController');

const service = new ConfirmationPaiementDevisService();
const middleware = require('../../middlewares/authentificationMiddleware');
const confirmationPaiementDevisController = new ConfirmationPaiementDevisController(service);

router.get('/:id', middleware.authenticateTokenMecanicienAndManager,confirmationPaiementDevisController.findById.bind(confirmationPaiementDevisController));
router.get('/', middleware.authenticateTokenMecanicienAndManager,confirmationPaiementDevisController.findById.bind(confirmationPaiementDevisController));
router.post('/', middleware.authenticateTokenMecanicienAndManager,confirmationPaiementDevisController.create.bind(confirmationPaiementDevisController));
router.delete('/:id', middleware.authenticateTokenMecanicienAndManager,confirmationPaiementDevisController.delete.bind(confirmationPaiementDevisController));

module.exports = router;
