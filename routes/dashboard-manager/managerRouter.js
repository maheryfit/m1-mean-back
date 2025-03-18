const express = require('express');
const router = express.Router();

const ManagerService = require('../../services/dashboard-manager/managerService');
const ManagerController = require('../../controllers/dashboard-manager/managerController');

const service = new ManagerService();
const managerController = new ManagerController(service);

router.get('', managerController.getAll.bind(managerController));
router.get('/:id',managerController.findById.bind(managerController));
router.post('', managerController.create.bind(managerController));
router.put('/:id', managerController.update.bind(managerController));
router.delete('/:id', managerController.delete.bind(managerController));

module.exports = router;
