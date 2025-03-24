const middleware = require("../../middlewares/authentificationMiddleware");
const express = require("express");
const router=express.Router();

const MaintenanceController=require("../../controllers/dashboard-mecanicien/MaintenanceController");
const MaintenanceService=require("../../services/dashboard-mecanicien/MaintenanceService");
const maintenanceService=new MaintenanceService();
const maintenanceController=new MaintenanceController(maintenanceService);

router.post("/", middleware.authenticateTokenMecanicien, maintenanceController.create.bind(maintenanceController));
router.delete("/:id", middleware.authenticateTokenMecanicien, maintenanceController.delete.bind(maintenanceController));

module.exports = router;
