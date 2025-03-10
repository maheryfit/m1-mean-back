const express = require('express');
const router = express.Router();
const AuthService = require('../services/authService')
const UserController = require('../controllers/userController');

const service = new AuthService();
const userController = new UserController(service);

/**
 * Occur error: service is undefined
 */
//router.post('/login', userController.login);
router.post('/login', userController.login.bind(userController));
router.post('/register', userController.register.bind(userController));

module.exports = router
