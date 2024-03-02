const router = require('express').Router()

const { getAllSessionPlayers, getOneSessionPlayer, createSessionPlayer, updateSessionPlayer, deleteSessionPlayer, getSessionPlayers, addMyPlayerToSession } = require('../controllers/sessionPlayer.controller')
const { checkAuth, isAdmin } = require('../middleware/auth');

router.get('/find', getSessionPlayers)
router.get('/:id', getOneSessionPlayer)
router.get('/', getAllSessionPlayers)

router.post('/', checkAuth, isAdmin, createSessionPlayer)
router.post('/enrole', checkAuth, addMyPlayerToSession)

router.patch('/:id', checkAuth, isAdmin, updateSessionPlayer)

router.delete('/:id', checkAuth, isAdmin, deleteSessionPlayer)

module.exports = router