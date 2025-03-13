const express = require('express');
const router = express.Router();
const AuthService = require('../services/authentificationService')
const UserController = require('../controllers/utilisateurController');
const config = require("../config");
const service = new AuthService();
const tokenUtil = require("../utils/tokenUtil");
const userController = new UserController(service, config, tokenUtil);
const middleware = require('../middlewares/authentificationMiddleware');
/**
 * Occur error: service is undefined because it's out of the context of the object userController
 */
//router.post('/login', userController.login);
router.post('/login', userController.login.bind(userController));
router.post('/register', userController.register.bind(userController));
router.get('/logout', userController.logout.bind(userController));
/**
 * Is user connected following a role ?
 */
router.get('/checkAuthConnected', middleware.authenticateToken, userController.checkAuthConnected.bind(userController));
router.get('/checkAuthMecanicien', middleware.authenticateTokenMecanicien, userController.checkAuthMecanicien.bind(userController));
router.get('/checkAuthManager', middleware.authenticateTokenManager, userController.checkAuthManager.bind(userController));

router.get('', middleware.authenticateTokenManager, userController.getUsers.bind(userController));

module.exports = router
