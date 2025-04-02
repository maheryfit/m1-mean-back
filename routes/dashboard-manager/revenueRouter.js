const express = require('express');
const router = express.Router();

const RevenueService = require('../../services/dashboard-manager/revenueService');
const RevenueController = require('../../controllers/dashboard-manager/revenueController');

const service = new RevenueService();
const revenueController = new RevenueController(service);

router.get('/benefice/:year', revenueController.getBeneficePerMonth.bind(revenueController));
router.get('/revenue/:year/:month', revenueController.getRevenuePerDay.bind(revenueController));
router.get('/revenue/:year', revenueController.getRevenuePerMonth.bind(revenueController));

module.exports = router;
