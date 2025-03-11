const express = require('express');
const router = express.Router();
const AuthService = require('../services/authService')
const UserController = require('../controllers/userController');

const service = new AuthService();
const userController = new UserController(service);
const middleware = require('../middlewares');
/**
 * Occur error: service is undefined because it's out of the context of the object userController
 */
//router.post('/login', userController.login);
router.post('/login', userController.login.bind(userController));
router.post('/register', userController.register.bind(userController));
router.get('', middleware.authenticateTokenManager, userController.getUsers.bind(userController));

module.exports = router
