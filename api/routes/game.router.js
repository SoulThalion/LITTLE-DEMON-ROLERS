const router = require('express').Router()
const { checkAuth, isAdmin } = require('../middleware/auth');

const { getAllGames, getOneGame, createGame, updateGame, deleteGame, getGames } = require('../controllers/game.controller')

router.get('/find', getGames)
router.get('/:id', getOneGame)
router.get('/', getAllGames)

router.post('/', checkAuth, isAdmin, createGame)

router.patch('/:id', checkAuth, isAdmin, updateGame)

router.delete('/:id', checkAuth, isAdmin, deleteGame)

module.exports = router