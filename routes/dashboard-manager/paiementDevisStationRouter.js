const express = require('express');
const router = express.Router();

const PaiementDevisStationService = require('../../services/dashboard-manager/paiementDevisStationService');
const PaiementDevisStationController = require('../../controllers/dashboard-manager/paiementDevisStationController');

const service = new PaiementDevisStationService();
const paiementDevisStationController = new PaiementDevisStationController(service);

router.get('/', paiementDevisStationController.getAll.bind(paiementDevisStationController));

module.exports = router;
