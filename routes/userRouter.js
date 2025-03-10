const express = require('express');
const router = express.Router();
const AuthService = require('../services/authService')
const UserController = require('../controllers/userController');

const service = new AuthService();
const userController = new UserController(service);

router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router
