const middleware = require("../../middlewares/authentificationMiddleware");
const express = require("express");
const router=express.Router();

const MaintenanceController=require("../../controllers/dashboard-mecanicien/MaintenanceController");
const MaintenanceService=require("../../services/dashboard-mecanicien/MaintenanceService");
const maintenanceService=new MaintenanceService();
const maintenanceController=new MaintenanceController(maintenanceService);

router.delete("/:id", middleware.authenticateTokenMecanicien, maintenanceController.delete.bind(maintenanceController));
router.get("/:id", middleware.authenticateTokenMecanicien, maintenanceController.findById.bind(maintenanceController));
router.post("/detail-maintenances/:id", middleware.authenticateTokenMecanicienAndManager, maintenanceController.addNewDetailMaintenance.bind(maintenanceController));
router.put("/:id/setdateheurerellefin/:detail_maintenance", middleware.authenticateTokenMecanicienAndManager, maintenanceController.setDateheureFinReelleDetailMaintenance.bind(maintenanceController));
router.get('/:devis/devis', middleware.authenticateToken,maintenanceController.findByDevis.bind(maintenanceController));

module.exports = router;
