const express = require('express');
const router = express.Router();

const ChangementStatutClientService = require('../../services/dashboard-manager/changementStatutClientService');
const ChangementStatutClientController = require('../../controllers/dashboard-manager/changementStatutClientController');

const service = new ChangementStatutClientService();
const changementStatutClientController = new ChangementStatutClientController(service);

router.get('', changementStatutClientController.getAll.bind(changementStatutClientController));
router.post('', changementStatutClientController.create.bind(changementStatutClientController));

module.exports = router;
