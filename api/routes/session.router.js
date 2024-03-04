const router = require('express').Router()

const { getAllSessions, getOneSession, createSession, updateSession, deleteSession, getSessions } = require('../controllers/session.controller')
const { checkAuth, isAdmin } = require('../middleware/auth');

router.get('/find', checkAuth, getSessions)
router.get('/:id', checkAuth, getOneSession)
router.get('/', checkAuth, getAllSessions)

router.post('/', checkAuth, createSession)

router.patch('/:id', checkAuth, isAdmin, updateSession)

router.delete('/:id', checkAuth, deleteSession)

module.exports = router