const router = require('express').Router();
const { checkAuth } = require('../middleware/auth');
const { getAllFavorites, createFavorite, deleteFavorite } = require('../controllers/user.controller');

router.post('/favorite/:gameId', checkAuth, createFavorite);

router.get('/:userId', checkAuth, getAllFavorites)

router.delete('/:userId/serie/:serieId', checkAuth, deleteFavorite);

module.exports = router;