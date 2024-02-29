const router = require('express').Router()

const { getAllGames, getOneGame, createGame, updateGame, deleteGame, getGames } = require('../controllers/game.controller')

router.get('/find', getGames)
router.get('/:id', getOneGame)
router.get('/', getAllGames)

router.post('/', createGame)

router.patch('/:id', updateGame)

router.delete('/:id', deleteGame)

module.exports = router