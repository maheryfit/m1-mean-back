const express = require('express');
const router = express.Router();

const ArticleService = require('../../services/dashboard-mecanicien/articleService');
const ArticleController = require('../../controllers/dashboard-mecanicien/articleController');

const service = new ArticleService();
const middleware = require('../../middlewares/authentificationMiddleware');
const articleController = new ArticleController(service);

router.get('/', middleware.authenticateToken,articleController.getAll.bind(articleController));
router.get('/:id', middleware.authenticateToken,articleController.findById.bind(articleController));
router.post('/', middleware.authenticateTokenManager,articleController.create.bind(articleController));
router.put('/:id', middleware.authenticateTokenManager,articleController.update.bind(articleController));
router.delete('/:id', middleware.authenticateTokenManager,articleController.delete.bind(articleController));

module.exports = router;
