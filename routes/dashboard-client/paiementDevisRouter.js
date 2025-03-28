const express = require('express');
const router = express.Router();

const PaiementDevisService = require('../../services/dashboard-client/paiementDevisService');
const PaiementDevisController = require('../../controllers/dashboard-client/paiementDevisController');

const service = new PaiementDevisService();
const middleware = require('../../middlewares/authentificationMiddleware');
const paiementDevisController = new PaiementDevisController(service);

router.get('/effectuer', middleware.authenticateToken,paiementDevisController.getPaiementEffectuer.bind(paiementDevisController));
router.get('/annuler', middleware.authenticateToken,paiementDevisController.getPaiementAnnuler.bind(paiementDevisController));
router.get('/valider', middleware.authenticateToken,paiementDevisController.getPaiementValider.bind(paiementDevisController));
router.get('/:id', middleware.authenticateToken,paiementDevisController.findById.bind(paiementDevisController));
router.post('/', middleware.authenticateTokenClient,paiementDevisController.create.bind(paiementDevisController));
router.delete('/:id', middleware.authenticateTokenClient,paiementDevisController.delete.bind(paiementDevisController));

module.exports = router;
