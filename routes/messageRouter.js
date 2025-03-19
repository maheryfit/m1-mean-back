const express = require('express');
const router = express.Router();

const MessageService = require('../services/messageService');
const MessageController = require('../controllers/messageController');

const service = new MessageService();
const middleware = require('../middlewares/authentificationMiddleware');
const messageController = new MessageController(service);

router.post('', middleware.authenticateToken,messageController.create.bind(messageController));
router.get('/:id', middleware.authenticateToken,messageController.findById.bind(messageController));


module.exports = router;
